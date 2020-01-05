<?php
session_start();
include './db.php';
try{
  if(isset($_SESSION['pid'])){
    $pid = $_SESSION['pid'];
    $sql="SELECT patient_reg_info.patient_name, FROM clinical_database.patient_reg_info WHERE patient_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $pid);
    $stmt->execute();
    $result = $stmt->get_result();
    if(!$row = $result->fetch_assoc())
    {
      echo "<script> alert('Patient ID not found!!'); window.open('register.php','_self')</script>";
    }
    else {
        $pname = $row['patient_name'];
        $sql="SELECT patient_reg_info.patient_name, FROM clinical_database.patient_reg_info WHERE patient_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('i', $pid);
        $stmt->execute();
  ?> 
    <!doctype html> 
    <html lang="en"> 
        <head> 
            <meta charset="utf-8"> 
            <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"> 
            <meta name="description" content=""> 
            <meta name="author" content=""> 
            <title>Dashboard Template for Bootstrap</title>             
            <!-- Bootstrap core CSS -->             
            <link href="bootstrap/css/bootstrap.css" rel="stylesheet"> 
            <!-- Custom styles for this template -->             
            <link href="dashboard.css" rel="stylesheet"> 
        </head>         
        <body> 
            <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow"> 
                <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Company name</a> 
                <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search"> 
                <ul class="navbar-nav px-3" style="background-color: #2ccd27;"> 
                    <li class="nav-item text-nowrap"> 
                        <a class="nav-link" href="#">Go</a> 
                    </li>                     
                </ul>                 
            </nav>             
            <div class="container-fluid"> 
                <div class="row"> 
                    <nav class="col-md-2 d-none d-md-block bg-light sidebar"> 
                        <div class="sidebar-sticky"> 
                            <ul class="nav flex-column"> 
                                <li class="nav-item"> 
                                    <a class="nav-link active" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"> 
                                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>                                             
                                            <polyline points="9 22 9 12 15 12 15 22"></polyline>                                             
                                        </svg>&nbsp;SOFA Monitor<span class="sr-only">(current)</span></a> 
                                </li>                                 
                                <li class="nav-item"> 
                                    <a class="nav-link" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file"> 
                                            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>                                             
                                            <polyline points="13 2 13 9 20 9"></polyline>                                             
                                        </svg>&nbsp;Patient File</a> 
                                </li>                                 
                                <li class="nav-item"> 
                                    <a class="nav-link" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-cart"> 
                                            <circle cx="9" cy="21" r="1"></circle>                                             
                                            <circle cx="20" cy="21" r="1"></circle>                                             
                                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>                                             
                                        </svg>&nbsp;#Placeholder</a> 
                                </li>                                 
                                <li class="nav-item">                                      
</li>                                 
                                <li class="nav-item">                                      
</li>                                 
                                <li class="nav-item">                                      
</li>                                 
                            </ul>                             
                            <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"> <span>PlaceHOLDER</span> <a class="d-flex align-items-center text-muted" href="#"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle"> 
                                        <circle cx="12" cy="12" r="10"></circle>                                         
                                        <line x1="12" y1="8" x2="12" y2="16"></line>                                         
                                        <line x1="8" y1="12" x2="16" y2="12"></line>                                         
                                    </svg> </a> </h6> 
                            <ul class="nav flex-column mb-2"> 
                                <li class="nav-item">                                      
</li>                                 
                                <li class="nav-item"> 
                                    <a class="nav-link" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-text"> 
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>                                             
                                            <polyline points="14 2 14 8 20 8"></polyline>                                             
                                            <line x1="16" y1="13" x2="8" y2="13"></line>                                             
                                            <line x1="16" y1="17" x2="8" y2="17"></line>                                             
                                            <polyline points="10 9 9 9 8 9"></polyline>                                             
                                        </svg>&nbsp;PlaceHolder</a> 
                                </li>                                 
                                <li class="nav-item">                                      
</li>                                 
                                <li class="nav-item">                                      
</li>                                 
                            </ul>                             
                        </div>                         
                    </nav>                     
                    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4"> 
                        <div class="chartjs-size-monitor" style="position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px; overflow: hidden; pointer-events: none; visibility: hidden; z-index: -1;"> 
                            <div class="chartjs-size-monitor-expand" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"> 
                                <div style="position:absolute;width:1000000px;height:1000000px;left:0;top:0"></div>                                 
                            </div>                             
                            <div class="chartjs-size-monitor-shrink" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"> 
                                <div style="position:absolute;width:200%;height:200%;left:0; top:0"></div>                                 
                            </div>                             
                        </div>                         
                        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"> 
                            <h1 class="h2"><?php echo $patient_name;?></h1> 
                            <div class="btn-toolbar mb-2 mb-md-0"> 
                                <div class="btn-group mr-2"> 
                                    <button class="btn btn-sm btn-outline-secondary">Print</button>                                     
                                    <button class="btn btn-sm btn-outline-secondary">#placeholder</button>                                     
                                </div>                                 
                                <button class="btn btn-sm btn-outline-secondary dropdown-toggle"> 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewbox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar"> 
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>                                         
                                        <line x1="16" y1="2" x2="16" y2="6"></line>                                         
                                        <line x1="8" y1="2" x2="8" y2="6"></line>                                         
                                        <line x1="3" y1="10" x2="21" y2="10"></line>                                         
                                    </svg>                                     
                                    This week
                                </button>                                 
                            </div>                             
                        </div>
                        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1>Sepsis Risk Factor :</h1> 
                            <h1 class="h2"></h1> 
                            <div class="btn-toolbar mb-2 mb-md-0"> 
                                <div class="btn-group mr-2">                                                                           
</div>                                                                  
                            </div>                             
                            <h1>#score here</h1>
                        </div>                         
                        <canvas class="my-4 w-100 chartjs-render-monitor" id="myChart" width="2304" height="972" style="display: block; height: 486px; width: 1152px;"></canvas>                         
                        <h2>Vitals Analysis</h2> 
                        <div class="table-responsive"> 
                            <table class="table table-striped table-sm"> 
                                <thead> 
                                    <tr> 
                                        <th>#</th> 
                                        <th>Parameter</th> 
                                        <th>Latest</th> 
                                        <th>Highest</th> 
                                        <th>Mean</th> 
                                    </tr>                                     
                                </thead>                                 
                                <tbody> 
                                    <tr> 
                                        <td>1</td> 
                                        <td>Temperature</td> 
                                        <td>#val</td> 
                                        <td>#val</td> 
                                        <td>#val</td> 
                                    </tr>                                     
                                    <tr> 
                                        <td>2</td> 
                                        <td>Blood pressure</td> 
                                        <td>#val</td> 
                                        <td>#val</td> 
                                        <td>#val</td> 
                                    </tr>                                     
                                    <tr> 
                                        <td>3</td> 
                                        <td>O2 levels</td> 
                                        <td>#val</td> 
                                        <td>#val</td> 
                                        <td>#val</td> 
                                    </tr>                                     
                                    <tr> 
                                        <td>3</td> 
                                        <td>Respiration</td> 
                                        <td>#val</td> 
                                        <td>#val</td> 
                                        <td>#val</td> 
                                    </tr>                                     
                                    <tr> 
                                        <td>5</td> 
                                        <td>saved for future</td> 
                                        <td>diam</td> 
                                        <td>Sed</td> 
                                        <td>nisi</td> 
                                    </tr>                                                                                                                                                                                                                                                                                                                                                                                                                       
                                    <tr> 
                                        <td>1,015</td> 
                                        <td>sodales</td> 
                                        <td>ligula</td> 
                                        <td>in</td> 
                                        <td>libero</td> 
                                    </tr>                                     
                                </tbody>                                 
                            </table>                             
                        </div>                         
                    </main>                     
                </div>                 
            </div>             
            <!-- Bootstrap core JavaScript
    ================================================== -->             
            <!-- Placed at the end of the document so the pages load faster -->             
            <script src="assets/js/jquery.min.js"></script>             
            <script src="assets/js/popper.js"></script>             
            <script src="bootstrap/js/bootstrap.min.js"></script>             
            <!-- Icons -->             
            <script src="https://unpkg.com/feather-icons/dist/feather.min.js"></script>             
            <script>feather.replace()</script>             
            <!-- Graphs -->             
            <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js"></script>             
            <script>
      var ctx = document.getElementById("myChart");
      var myChart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","shit"],
              datasets: [{
                  data: [15, 21, 18, 24, 23, 24, 12,9000],
                  lineTension: 0,
                  backgroundColor: 'transparent',
                  borderColor: '#007bff',
                  borderWidth: 4,
                  pointBackgroundColor: '#007bff'
              }]
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero: false
                      }
                  }]
              },
              legend: {
                  display: false,
              }
          }
      });
    </script>             
        </body>         
    </html>     
<?php
    }
  }
}
catch(Exception $e){
	echo "<script> window.alert('Unable to process request :$e->getMessage()'); window.location.href='index.php'; </script>";
}
?>
