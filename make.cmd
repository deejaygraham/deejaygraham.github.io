echo refreshing tags folder

rd /S /Q tags 
md tags
xcopy _site\tags\*.* tags /S /I 

jekyll serve --baseurl=


