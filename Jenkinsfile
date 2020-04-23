pipeline {
  agent any
  stages {
    stage('test') {
      steps {
        sh 'docker exec -it web npm run coverage'
      }
    }
  }
}
