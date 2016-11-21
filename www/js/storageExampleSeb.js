function isCurrentUser(uid){
	return request.auth.uid == uid;
}
function lessThanMegabytes(n){
	return request.resource.size < 5 *1024 * 1024;
}
function isImage(n){
	return request.resource.contentType.matches("image/.*");
}

service firebase.storage {
  match /b/comendo-asso.appspot.com/o {
    match /informations/{uid} {
    match /{allPaths=**}{
    	allow read;
    }
    match /{filename}{
    	allow write: if request.auth.token.isAdmin == true &&
      (filename == "file1.mov" || filename == "file2.png");//if request.auth != null;
    }
    match /personnel/{uid}/{filename}{
		allow write:if isCurrentUser(uid) &&
		lessThanMegabytes(5)&&
		isImage() &&
		request.resource != null &&
		filename.size() < 32;
	}
      
    }
  }
}
