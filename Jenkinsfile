pipeline {
  agent any
  tools {nodejs "nodejs"}
  stages {
    stage('start') {
      steps {
        sh 'npm install'
   
      }
    }
    stage('test') {
      steps {
        sh 'npm test'
      }
    }
  }
}
