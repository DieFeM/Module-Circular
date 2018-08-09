$('document').ready(function(){
	var quill = new Quill('#editor', {
		theme: 'snow'
	});
});

function toggle_all(obj, selectBox)
{ 
    if (typeof selectBox == "string") { 
        selectBox = document.getElementById(selectBox);
		if (selectBox.type == "select-multiple") { 
			for (var i = 0; i < selectBox.options.length; i++) { 
				 selectBox.options[i].selected = obj.checked; 
			} 
		}
    }
}

function send_circular()
{
	var addpost = {};
	addpost['admins'] = $('#select_admins').val(),
	addpost['users'] = $('#select_users').val(),
	addpost['groups'] = $('#select_groups').val(),
	addpost['subusers_of_users'] = $('#select_subusers_of_users').val(),
	addpost['subject'] = $('#subject').val().trim(),
	addpost['message'] = document.getElementById("editor").getElementsByClassName("ql-editor")[0].innerHTML,
	addpost['send_circular'] = "send";
	
	if(addpost['admins'] == null && addpost['users'] == null && addpost['groups'] == null && addpost['subusers_of_users'] == null)
	{
		alert('Select at least one recipient (Send To).');
		return;
	}
	
	if(addpost['subject'] == null || addpost['subject'] == "")
	{
		alert('Introduce a subject.');
		return;
	}
	
	if(addpost['message'] == "<p><br></p>")
	{
		alert('Introduce a Message.');
		return;
	}
	
	var destURL = "home.php?m=circular";
	var destURLCleared = destURL + "&type=cleared";
	
	$.ajax({
		type: "POST",
		url: destURLCleared,
		data: addpost,
		success: function(data){
			alert(data);
			location.href = destURL;
		}
	});
}



