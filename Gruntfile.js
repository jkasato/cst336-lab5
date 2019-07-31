// Gruntfile.js

// From tutorial: Run this in cmd
//npm install --save-dev grunt grunt-contrib-watch grunt-execute
//grunt watch

// that didnt work, so ran this from forum
// npm install grunt-cli -g
// where grunt
// path=%PATH%;%APPDATA%\npm
// grunt watch

//then ran 
//npm install --save-dev grunt grunt-contrib-watch grunt-execute
//grunt watch
//then it worked

// Gruntfile.js
module.exports = (grunt) => {
// export default (grunt) => {
    grunt.initConfig({
        execute: {
            target: {
                src: ['app.js']
            }
        },
        watch: {
            scripts: {
                files: ['app.js'],
                tasks: ['execute'],
            },
        }
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-execute');
};