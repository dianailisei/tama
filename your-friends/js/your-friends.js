function searchFriends() {
     var input, filter, ul, li, a, i;
     input = document.getElementById("userSeachFriendsInput");
     filter = input.value.toUpperCase();
     ul = document.getElementById("search-list");
     li = ul.getElementsByTagName("li");
     for (i = 0; i < li.length; i++) {
         a = li[i].getElementById("searchTag");
         if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
             li[i].style.visibility = "visible";
         } else {
             li[i].style.display = "none" ;
         }
     }
 }