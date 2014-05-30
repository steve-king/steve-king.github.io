steve-king.github.io
====================

Using this as design inspiration: http://halcyon-theme.tumblr.com/


Image are optimised using imagemin. 

Note: If there are lots of image files - terminal may throw an error when running this task (too many files open). To get around this you can edit your `.bash_profile` file in your home directory:

    sudo nano ~/.bash_profile

and add the following line:

    ulimit -n 1024

`CTRL + O` to save, then `CTRL + x` to exit. Restart terminal and try running the task again.

This task will take several minutes to complete the first time you run it. After that the output should be cached so it will run quickly next time.