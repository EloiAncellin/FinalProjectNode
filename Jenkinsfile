pipeline {
  agent any
  tools {nodejs "nodejs"}
  stages {
    stage('start') {
      steps {
        sh '/usr/local/bin/docker-compose up'
   
      }
    }
  }
}
