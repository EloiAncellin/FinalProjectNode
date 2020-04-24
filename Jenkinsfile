pipeline {
  agent any
  tools {nodejs "nodejs"}
  stages {
    stage('start') {
      steps {
        sh '/usr/bin/docker-compose up'
   
      }
    }
  }
}
