# Scrum front-end

This is a demo web-platform for project management based on scrum methodology.

Developed with angular 14, bootstrap, ngrx.

## Descriprion 

Main features of the application:

### Unauthorized user:

* register
* login

### Authorized user:

* create new project
* make a request to join another project by project Id
* open projects where he is a project member
  * see usernames of other project members
  * create / update / delete / move tasks
  * leave project

### Project admin:

* see usernames and email of users who are in queue to join the project
* accept / reject user's request to join the project
* update / delete project
* create / update / delete iterations
* create / update / delete / move tasks