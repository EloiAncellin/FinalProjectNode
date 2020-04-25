pipeline {
  agent { label 'docker'
         dockerfile true 
        }
  tools {nodejs "nodejs"}
  stages {
    stage('start') {
      steps {
        sh 'docker exec -it web npm run coverage'
      }
    }
 
  }
}


