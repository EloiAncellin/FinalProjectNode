pipeline {
  agent any
  tools {nodejs "nodejs"}
  stages {
    stage('start') {
      steps {
        sh 'echo $PATH'
        sh '/usr/local/bin/docker-compose up --build'
      }
    }
    stage('test') {
      steps {
        sh 'docker exec -it web npm run coverage'
      }
    }
  }
}


