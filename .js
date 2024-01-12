
function UpdateListItem(){
    var listName="samplelist";
    var itemId=1;

    var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName+ "')/items/getbyid("+itemId+")";
    var configAxios = {
        headers: {
            "Accept": "application/json;odata=verbose",
            "X-RequestDigest": document.getElementById('__REQUESTDIGEST').value,
            "X-HTTP-Method": "MERGE",
            "If-Match": "*",
            "Content-Type":"application/json;odata=verbose"
        }   
    };
    var itemType=GetItemTypeForListName(listName);
    var data = {
        "__metadata": {"type": itemType },
        "Title": "MyTest"
    };
    axios.post(url,data,configAxios).then(function(req){         
        console.log('Success');
    }).catch(function(err){
        console.log('error during http call', err);
    });
}
function GetItemTypeForListName(name) {
    return "SP.Data." + name.charAt(0).toUpperCase() + name.split(" ").join("").slice(1) + "ListItem";
}
