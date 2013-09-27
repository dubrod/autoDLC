$(document).ready( function(){
	
		//CUSTOMIZED VARIABLES
		thumbFolder  	= "tns/";
		photosFolder  	= "photos/";
		magnifierImg	= "images/zoom-in.png";
		prevArrow		= "&#xe018;";
		nextArrow		= "&#xe015;";
		preloadBigs		= true;
		
		//SETUP
		posId 			= 0;
		fileextension	= ".jpg";
		photosObject	= new Object();
		photosObject	= [];
		
		//GET PHOTOS FOLDER / MAKE OBJECT
		$.ajax({
            url: photosFolder,
            success: function (files) {
            	//console.log(files);
                $(files).find("a:contains(" + fileextension + ")").each(function () {
                    var filename = this.href.replace(window.location, "").replace("http:///","");
                    obj = {"name": filename};
                    photosObject.push(obj);
                });
            }
        });
           
        $(document).ajaxSuccess(function() {
        	for ( var i=0; i<photosObject.length; i++ ) {
        		
        		if(!photosObject[i]){break;} //error failsafe
        		
				$("#autoDLC").append('<div class="tn"><div class="img"><img src="'+ thumbFolder + photosObject[i].name + '"></div><button class="thumbnail" data-info=\'{"photo":"' + photosObject[i].name + '","id":"' + i + '"}\'><img src="'+ magnifierImg + '" alt="ENLARGE" /></button></div>');
			}
			
			//CLICK EVENT MUST INITIALIZED IN HERE 
			$('.thumbnail').click(function() {
				photoname = $(this).data('info').photo;
				photoid = $(this).data('info').id;
				
				showGallery(photoname, photoid);
			});
			
			//NEXT SLIDE
			$('.next').click( function(){
				posId++;
		
				if(!photosObject[posId]){posId = 0;}
				$('#imageWindow').html('<img src="'+photosFolder+photosObject[posId].name+'">');
				
			});
			
			//PREV SLIDE
			$('.prev').click( function(){
				posId--;
				
				if(!photosObject[posId]){posId = photosObject.length;}
				$('#imageWindow').html('<img src="'+photosFolder+photosObject[posId].name+'">');
				
			});
			
			//PRELOAD SET TRUE OR FALSE
			if(preloadBigs==true){
				for ( var i = 0; i < photosObject.length; i++ ) {
	        		if(!photosObject[i]){break;} //error failsafe
					$("#preloadBigs").append('<img src="'+ photosFolder + photosObject[i].name + '">');
				}
			}
			
			//CLOSE EVENT
			$('#closeGallery').click(function() {$('#galleryWindow').fadeOut("slow");});
			
			//ESC CLOSE
			$(document).bind('keydown', function(e){if(e.which == 27){$('#galleryWindow').fadeOut("slow");}}); 	

        }); // EOF AFTER SUCCESS       

		//RUN THE GALLERY
		function showGallery(photoname, photoid){
			posId = photoid;
			$('#galleryWindow').fadeIn("slow");
			$('#imageWindow').html('<img src="'+photosFolder+photoname+'">');
			$('#imageWindow').fadeIn("slow");
		};
		
		//APPEND THE POPUP
		$('body').append('<div id="galleryWindow"><div id="imageContainer"><div id="closeGallery">Click Here or Hit ESC Key to Close</div><div class="slimControls prev"><button><i data-icon="'+prevArrow+'" class="icon"></i></button></div><div class="slimControls next"><button><i data-icon="'+nextArrow+'" class="icon"></i></button></div><div id="imageWindow"></div></div></div><div id="preloadBigs" style="display:none;"></div>');
});