pipeline {
  agent {Dockerfile : true}
  tools {nodejs "nodejs"}
  stages {
    stage('start') {
      steps {
        sh 'echo $PATH'
        sh 'npm install'
        sh 'npm start'
      }
    }
 
  }
}


