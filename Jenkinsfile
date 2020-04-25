pipeline {
  agent any
  tools {nodejs "nodejs"}
  stages {
    stage('start') {
      steps {
        sh 'APP_ENV=test /usr/local/bin/docker-compose up -d -p 8080:8083'
      }
    }
        stage('test') {
      steps {
        sh '/usr/local/bin/docker exec web npm run coverage'
      }
    }
    stage('stop'){
      steps{
        sh '/usr/local/bin/docker-compose down'
      }
    } 
  }
}


