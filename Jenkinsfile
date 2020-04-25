pipeline {
  agent any
  tools {nodejs "nodejs"}
  stages {
    stage('start') {
      steps {
        sh 'echo $PATH'
        sh 'APP_ENV=dev /usr/local/bin/docker-compose up --build'
      }
    }
    stage('test') {
      steps {
        sh '/usr/local/bin/docker exec -it web npm run coverage'
      }
    }
  }
}


