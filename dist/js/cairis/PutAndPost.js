/**
 * Created by Raf on 11/05/2015.
 */

//TODO: functions in cairis.js zetten
function updateRequirement(row){
    if ($(row).attr('class') != undefined) {
        // if new Row, POST
        var clazz = $(row).attr('class');
        //Not new anymore now we are Posting it
        $(clazz).removeClass(clazz);
        arr = clazz.split(':');
        var whatKind = arr[0];
        var vall = arr[1];
        postRequirementRow(row,whatKind,vall);
    }
    else{
        //if old row, PUT
        putRequirementRow(row)
    }
}


function reqRowtoJSON(row){
    //TODO: cant replace in object!
    row = row.replace('<tr>','');
    row = row.replace('</tr>','');
    var json = {};
    json.attrs = {};

    console.log(row);
    $(row).filter('td').each(function (i, v) {
        name =  $(v).attr("name");
        if(name != "originator" && name != "rationale" && name != "type" && name != "fitCriterion"){
            json[name] =  v.innerHTML;
        }
        else{
            json.attrs[name] = v.innerHTML;
        }
    });
    return json
}


/*
 Updating the requirementsRow
 */
function putRequirementRow(row){
   json = reqRowtoJSON(row);
    $.ajax({
        type: "PUT",
        dataType: "json",
        contentType: "application/json",
        accept: "application/json",
        //TODO: DATA aanpassen voor PUT
        data: json,
        crossDomain: true,
        url: serverIP + "/api/requirements/update" ,
        success: function (data) {
            showPopup(true);
        },
        error: function (xhr, textStatus, errorThrown) {
            showPopup(false);
            console.log(this.url);
            console.log("error: " + xhr.responseText +  ", textstatus: " + textStatus + ", thrown: " + errorThrown);
        }
    });

}
function postRequirementRow(row,whatKind,value){
    json = reqRowtoJSON(row);
    $.ajax({
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        accept: "application/json",
        data: {
            session_id: String($.session.get('sessionID')),
           body: JSON.stringify(json)
        },
        crossDomain: true,
        url: serverIP + "/api/requirements/update?" + whatKind+"="+value.replace(' ',"%20"),
        success: function (data) {
            showPopup(true);
        },
        error: function (xhr, textStatus, errorThrown) {
            showPopup(false);
            console.log(this.url);
            console.log("error: " + xhr.responseText +  ", textstatus: " + textStatus + ", thrown: " + errorThrown);
        }
    });

}

/*
 Updating the requirementsRow
 */
function putAssetProperty(assetSON){
    var ursl = serverIP + "/api/assets/name/"+ $.session.get("AssetName").replace(' ',"%20") + "/properties?session_id=" + String($.session.get('sessionID'));
    //console.log("{ 'AssetEnvironmentPropertiesMessage': " + JSON.stringify(assetSON) + "}");
   // console.log($.session.get("UsedProperties"));
    var propsJon = JSON.parse($.session.get("thePropObject")).attributes;
    var theWholeObject = JSON.parse($.session.get("AssetProperties"));

    var index = -1;
    /// $.each(assts, function(arrayID,group) {
    /*$.each(propsJon, function(i, obj){
            if(obj.id == propsJon.id){
                propsJon.attributes[i] = assetSON;
            }
    });*/
    var theEnvProps = JSON.parse($.session.get("thePropObject"));
    theEnvProps.attributes[$.session.get("Arrayindex")] = assetSON;

    $.each(theWholeObject, function(index, obje){
       // alert(obje.environment);
        if(obje.environment == theEnvProps.environment){
            theWholeObject[index] = theEnvProps;
        }
    });

    $.session.set("AssetProperties", theWholeObject);
    //console.log(output);

    $.ajax({
        type: "PUT",
        dataType: "json",
        contentType: "application/json",
        accept: "application/json",
        crossDomain: true,
        origin: serverIP,
        data: output,
        url: ursl,
        success: function (data) {
            showPopup(true);
        },
        error: function (xhr, textStatus, errorThrown) {
            showPopup(false);
            console.log(this.url);
            console.log("error: " + xhr.responseText +  ", textstatus: " + textStatus + ", thrown: " + errorThrown);
        }
    });
}

function putAsset(json){
    var ursl = serverIP + "/api/assets/name/"+ $.session.get("AssetName").replace(' ',"%20") + "?session_id=" + String($.session.get('sessionID'));

    var output = {};
    output.object = json;
    output = JSON.stringify(output);

    //console.log(output);

    $.ajax({
        type: "PUT",
        dataType: "json",
        contentType: "application/json",
        accept: "application/json",
        crossDomain: true,
        processData: false,
        origin: serverIP,
        data: output,
        url: ursl,
        success: function (data) {
            showPopup(true);
        },
        error: function (xhr, textStatus, errorThrown) {
            showPopup(false);
            console.log(this.url);
            console.log("error: " + xhr.responseText +  ", textstatus: " + textStatus + ", thrown: " + errorThrown);
        }
    });
}
function updateAssetEnvironment(json){
    var ursl = serverIP + "/api/assets/name/"+ $.session.get("AssetName").replace(' ',"%20") + "/properties?session_id=" + String($.session.get('sessionID'));

    var output = {};
    output.object = json;
    output = JSON.stringify(output);

    $.ajax({
        type: "PUT",
        dataType: "json",
        contentType: "application/json",
        accept: "application/json",
        crossDomain: true,
        processData: false,
        origin: serverIP,
        data: output,
        url: ursl,
        success: function (data) {
            showPopup(true);
        },
        error: function (xhr, textStatus, errorThrown) {
            showPopup(false);
            console.log(this.url);
            console.log("error: " + xhr.responseText +  ", textstatus: " + textStatus + ", thrown: " + errorThrown);
        }
    });
}