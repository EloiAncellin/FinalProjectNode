pipeline {
  agent any
  tools {nodejs "nodejs"}
  stages {
    stage('start') {
      steps {
        sh '/usr/locl/bin/docker-compose up'
   
      }
    }
  }
}
