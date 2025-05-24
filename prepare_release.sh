#!/bin/bash

#build the extension
webpack --mode production

#delete existing zip file
if [ -e dist.zip ];
  then rm dist.zip;
fi

#make the zip file
cd dist
zip -r dist.zip *

#move the zip file to parent directory
mv dist.zip ..

