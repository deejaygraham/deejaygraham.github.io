#!/bin/bash

# delete the tags folder
rm -rfv ./tags/*

jekyll build --drafts

# create tags folder

# copy built tags over 
cp -r ./_site/tags/* ./tags/

jekyll serve --drafts