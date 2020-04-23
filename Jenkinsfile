pipeline {
  agent any
  stages {
    stage('up') {
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
