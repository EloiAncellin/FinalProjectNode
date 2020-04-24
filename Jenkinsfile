pipeline {
  agent any
  tools {nodejs "nodejs"}
  stages {
    stage('start') {
      steps {
        sh '$PATH/usr/bin/docker-compose up'
   
      }
    }
  }
}
