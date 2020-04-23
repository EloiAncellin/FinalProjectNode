pipeline {
  agent any
  tools {nodejs "nodejs"}
  stages {
    stage('start') {
      steps {
        sh 'docker-compose up'
      }
    }
    stage('test') {
      steps {
        sh 'docker exec -it web npm run coverage'
      }
    }
  }
}
