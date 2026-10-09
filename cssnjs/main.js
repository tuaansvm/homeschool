
var menuhide = new Array();
var topmenuact = 0;
var submenuact = -1;
var submenuact1 = -1;
var treemenuact = -1;
var procurpage = 1;
var protitle;
var xmlfile;


function getHTMLFile() {
	var url = window.location.href;
	var nohttp = url.split('//')[1];
	var hostPort = nohttp.split('/');
	var htmlfile = hostPort[hostPort.length-1];
	return htmlfile;
}


function ajaxpage(url, containerid){
	var page_request = false;
	if (window.XMLHttpRequest) {// Mozilla, Safari, IE7 or latest ...	 
		 page_request = new XMLHttpRequest();
		 if (page_request.overrideMimeType) {
			page_request.overrideMimeType('text/html');
		 };
	} else if (window.ActiveXObject) { // IE 6 or early	 
		 try {
			page_request = new ActiveXObject("Msxml2.XMLHTTP");  
		 } catch (e) {
			try {  
			   page_request = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {};  
		 };
	};  
	if (!page_request) {
		alert('Cannot create XMLHTTP instance');  
		return false;
	};  
	page_request.onreadystatechange=function(){
		loadpage(page_request, containerid)  
	};
	page_request.open('GET', url, true);
	page_request.send(null)	;	
}  

function loadpage(page_request, containerid){  
    if (page_request.readyState == 4 ){//&& (page_request.status==200 || window.location.href.indexOf("http")==-1)
		document.getElementById(containerid).innerHTML=page_request.responseText  ;		
		//document.getElementById('wrap').style.Height = document.getElementById(containerid).offsetHeight + 'px';;
		//document.getElementById('output').innerHTML=document.getElementById(containerid).offsetHeight + '  ' + document.getElementById('wrap').offsetHeight;
	}
}


function checkProtocol(){
    var p=document.location.protocol;
    var result=(p=='http')?'online':'localhost';
    return result;
}

function fullurl(){
	var strUrl = window.location.href;
	if ( strUrl.indexOf("index.html") == -1 ){
		window.location.href = window.location.href + "index.html";
	}
}


function showhidecontent(contentid) { 

//	if (document.all) { //IS IE 4 or 5 (or 6 beta) 
//		eval( "document.all." + tagname + ".style.display = 'block'"); 
//	}	 
	if (document.layers) { //IS NETSCAPE 4 or below 
		if(document.layers[contentid].display == 'none')
		{
			document.layers[contentid].display = 'block'; 
		}
		else
		{
			document.layers[contentid].display = 'none';
		}
	}	 
	if (document.getElementById) { 
		
		if(document.getElementById(contentid).style.display == 'none' )
		{
			document.getElementById(contentid).style.display = 'block';  
		}
		else
		{
			document.getElementById(contentid).style.display = 'none'; 
		}
	} 
} 

function contactus(){
	alert("thanks for comment")
	}


function showhidemenu(menuid, _change)
{
	//	if (document.all) { //IS IE 4 or 5 (or 6 beta) 
//		eval( "document.all." + tagname + ".style.display = 'block'"); 
//	}	 
	var menuindex = parseInt(menuid.match(/\d+$/));
	if(menuhide[menuindex] == true) 
	{
		if (document.layers) { //IS NETSCAPE 4 or below 
			document.layers[menuid].display = 'block'; 
		}	 
		if (document.getElementById) { 
			document.getElementById(menuid).style.display = 'block'; 
		}
	}
	else
	{
		if (document.layers) { //IS NETSCAPE 4 or below 
			document.layers[menuid].display = 'none'; 
		}	 
		if (document.getElementById) { 
			document.getElementById(menuid).style.display = 'none'; 
		}
	}
	if(_change == 1)
	{
		menuhide[menuindex] = !menuhide[menuindex];
		//alert(menuhide[menuindex])
	}
	else
	{
		if(menuhide[menuindex] == true)
		{
			menuhide[menuindex] = !menuhide[menuindex];
		}
	}
	createarraytmenuhide(false);
}

function loadtreemenu(menuid, treeindex)
{
	document.getElementById(menuid).innerHTML = createtreemenu(menuid, treeindex);
}


function createtreemenu(menuid, treeindex)
{
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("GET","menu.xml",false);
	xmlhttp.send();
	xmlDoc=xmlhttp.responseXML; 
	var submenu;
	var submenu1;
	var menuactive = 0;
	var x=xmlDoc.getElementsByTagName("menu"); //lay danh sach menu cap 1
	var strtreemenu = "";
	for (i=0;i<x.length - 1;i++)
	{
		var i1 = i + 1;
		menuactive += 1;
		submenu = x[i].getElementsByTagName("submenu") //lay menu con cua menu cap 1 thu i
		if(i > 0)
		{
			strtreemenu += '<div id="menuline"></div>';
		}
		strtreemenu += '<div class="node">';
		if(submenu.length > 0) //menu co submenu
		{
			if(menuhide[i1] == true)
			{
				strtreemenu += '<a href="#" onclick="showhidemenu(\'submenu' + i1 + '\',1);';
				strtreemenu += 'loadtreemenu(\'' + menuid + '\',' + treemenuact + ')">';
				strtreemenu += '<img src="images/ftv2prootnode.png" /></a>';
			}
			else
			{
				strtreemenu += '<a href="#" onclick="showhidemenu(\'submenu' + i1 + '\',1);';
				strtreemenu += 'loadtreemenu(\'' + menuid + '\',' + treemenuact + ')">';
				strtreemenu += '<img src="images/ftv2mrootnode.png" /></a>';
			}				
		}
		else
		{
			strtreemenu += "<img src='images/ftv2blanknode.png' />";
		}
		if(x[i].getAttribute("index") == treeindex)
		{ 
			strtreemenu += '<span class="treeactive">';
		}
		strtreemenu += '<a href="#"';
		if(x[i].getAttribute("url") == '#')
		{
			//strtreemenu += ' onclick="showhidemenu(\'submenu' + i1 + '\');loadtreemenu(\'' + menuid + '\')"';
		}
		else
		{
			//strtreemenu += ' onclick="showhidemenu(\'submenu' + i1 + '\');loadtreemenu(\'' + menuid + '\');';
			if(x[i].getAttribute("action") == '')
			{
				strtreemenu += ' onclick="ajaxpage(\'contents/' + x[i].getAttribute("url") + '\', \'content\');';
			}
			else
			{
				strtreemenu += ' onclick="' + x[i].getAttribute("action") + ';';
			}
			strtreemenu += 'loadtopmenu(\'hmenu\',' + i + ');submenuclick(' + i + ',-1);submenu1click(' + i + ',-1,-1)';
			strtreemenu += ';createfootermenu(\'footermenu\',' + i + ')';
			strtreemenu += ';treeclick(' + x[i].getAttribute("index") + ')';
			if(submenu.length > 0)
			{
				strtreemenu += ';showhidemenu(\'submenu' + i1 + '\',0)';
			}
			strtreemenu += ';loadtreemenu(\'' + menuid + '\',' + x[i].getAttribute("index") + ')';			
		}
		//strtreemenu += x[i].getAttribute("url");
		strtreemenu += '">';
		strtreemenu += x[i].getAttribute("name");	
		strtreemenu += '</a>';
		if(x[i].getAttribute("index") == treeindex)
		{ 
			strtreemenu += '</span>';
		}
		strtreemenu += '</div>';
		if(submenu.length > 0)
		{	
			strtreemenu += '<div class="lefttreemenu">';			
			if(menuhide[i1] == true)
			{
				strtreemenu += '<span style="display:none;" id="submenu' + i1 + '">';
			}
			else
			{
				strtreemenu += '<span style="display:block;" id="submenu'  + i1 + '">';
			}
			for (j=0;j<submenu.length;j++)
			{
				var j1 = j + 1;
				menuactive += 1;
				submenu1 = submenu[j].getElementsByTagName("submenu1") //lay menu con cua menu cap 2
				var inttemp = parseInt('1' + i1 + '' + j1);
				strtreemenu += '<div class="subnode">';
				if(j == submenu.length - 1) //neu la menu con cuoi cung
				{
					if(submenu1.length > 0) //menu con cap 2 ton tai menu con cap 3
					{
						if(menuhide[inttemp] == true)
						{
							strtreemenu += '<a href="#" onclick="showhidemenu(\'submenu1' + i1 + '' + j1 + '\',1);';
							strtreemenu += 'loadtreemenu(\'' + menuid + '\',' + treemenuact + ')">';
							strtreemenu += '<img src="images/ftv2plastnode.gif" /></a>';
						}
						else
						{
							strtreemenu += '<a href="#" onclick="showhidemenu(\'submenu1' + i1 + '' + j1 + '\',1);';
							strtreemenu += 'loadtreemenu(\'' + menuid + '\',' + treemenuact + ')">';
							strtreemenu += '<img src="images/ftv2mlastnode.gif" /></a>';
						}
					}
					else
					{
						strtreemenu += '<img src="images/ftv2lastnode.gif" />';
					}
				}
				else
				{
					if(submenu1.length > 0)
					{
						if(menuhide[inttemp] == true)
						{
							strtreemenu += '<a href="#" onclick="showhidemenu(\'submenu1' + i1 + '' + j1 + '\',1);';
							strtreemenu += 'loadtreemenu(\'' + menuid + '\',' + treemenuact + ')">';
							strtreemenu += '<img src="images/ftv2pnode.gif" /></a>';
						}
						else
						{
							strtreemenu += '<a href="#" onclick="showhidemenu(\'submenu1' + i1 + '' + j1 + '\',1);';
							strtreemenu += 'loadtreemenu(\'' + menuid + '\',' + treemenuact + ')">';
							strtreemenu += '<img src="images/ftv2mnode.gif" /></a>';
						}
					}
					else
					{
						strtreemenu += '<img src="images/ftv2node.gif" />';
					}				
				}
				if(submenu[j].getAttribute("index") == treeindex)
				{ 
					strtreemenu += '<span class="treeactive">';
				}
				strtreemenu += '<a href="';
				var strurl = submenu[j].getAttribute("url");
				var arrurl = submenu[j].getAttribute("url").split('#');
				if(strurl.indexOf('#') > 0)
				{
					strtreemenu += '#' + arrurl[1] + '"';							
				}
				else
				{
					strtreemenu += '#"';
				}
				if(submenu[j].getAttribute("action") == "")
				{
					strtreemenu += ' onclick="ajaxpage(\'contents/' + arrurl[0] + '\', \'content\')';
				}
				else
				{
					strtreemenu += ' onclick="' + submenu[j].getAttribute("action") + '';
				}
				strtreemenu += ';submenuclick(' + i + ',' + j + ');loadtopmenu(\'hmenu\',' + i + ')';
				strtreemenu += ';createfootermenu(\'footermenu\',' + i + ')';
				strtreemenu += ';treeclick(' + submenu[j].getAttribute("index") + ')';
				strtreemenu += ';loadtreemenu(\'' + menuid + '\',' + submenu[j].getAttribute("index") + ')';
				if(submenu1.length > 0)
				{
					strtreemenu += ';showhidemenu(\'submenu1' + i1 + '' + j1 + '\',0)';
				}
				strtreemenu += '">';
				strtreemenu += submenu[j].getAttribute("name");
				strtreemenu += '</a>';
				if(submenu[j].getAttribute("index") == treeindex)
				{ 
					strtreemenu += '</span>';
				}
				strtreemenu += '</div>';
				if(submenu1.length > 0)
				{
					strtreemenu += '<div class="lefttreesubmenu">';
					if(menuhide[inttemp] == true)
					{
						strtreemenu += '<span style="display:none;" id="submenu1' + i1 + '' + j1 + '">';
					}
					else
					{
						strtreemenu += '<span style="display:block;" id="submenu1' + i1 + '' + j1 + '">';
					}
					for (k=0;k<submenu1.length;k++)
					{
						menuactive += 1;
						strtreemenu += '<div class="subnode">';
						if(k == submenu1.length -1)
						{
							strtreemenu += '<img src="images/ftv2lastnode.gif" />';
						}
						else
						{
							strtreemenu += "<img src='images/ftv2node.gif' />";
						}
						//strtreemenu += '<a href="' + submenu1[k].getAttribute("url") + '">';
						if(submenu1[k].getAttribute("index") == treeindex)
						{ 
							strtreemenu += '<span class="treeactive">';
						}
						strtreemenu += '<a href="';
						strurl = submenu1[k].getAttribute("url");
						arrurl = submenu1[k].getAttribute("url").split('#');
						if(strurl.indexOf('#') > 0)
						{
							strtreemenu += '#' + arrurl[1] + '"';							
						}
						else
						{
							strtreemenu += '#';
						}
						if(submenu1[k].getAttribute("action") == "")
						{
							strtreemenu += ' onclick="ajaxpage(\'contents/' + arrurl[0] + '\', \'content\')';
						}
						else
						{
							strtreemenu += ' onclick="' + submenu1[k].getAttribute("action") + '';
						}
						strtreemenu += ';loadtopmenu(\'hmenu\',' + i + ')';								
						strtreemenu += ';submenuclick(' + i + ',' + j + ');submenu1click(' + i + ',' + j + ',' + k + ')';
						strtreemenu += ';createfootermenu(\'footermenu\',' + i + ')';
						strtreemenu += ';treeclick(' + submenu1[k].getAttribute("index") + ')';
						strtreemenu += ';loadtreemenu(\'' + menuid + '\',' + submenu1[k].getAttribute("index") + ')"';
						strtreemenu += '>';
						strtreemenu += submenu1[k].getAttribute("name");					
						strtreemenu += '</a>';
						if(submenu1[k].getAttribute("index") == treeindex)
						{ 
							strtreemenu += '</span>';
						}
						strtreemenu += '</div>';
					}
					strtreemenu += '</span>';
					strtreemenu += '</div>';
				}
			}			
			strtreemenu += "</span>";
			strtreemenu += "</div>";
		}
	}
	return strtreemenu;
}


function treeclick(trindex)
{
	treemenuact = trindex;
}

function createarraytmenuhide(onload)
{
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("GET","menu.xml",false);
	xmlhttp.send();
	xmlDoc=xmlhttp.responseXML; 
	var submenu;
	var submenu1;
	var x=xmlDoc.getElementsByTagName("menu"); //lay danh sach menu cap 1
	var strtreemenu = "";
	for (i=0;i<x.length - 2;i++)
	{
		submenu = x[i].getElementsByTagName("submenu") //lay menu con cua menu cap 1 thu i
		if(submenu.length > 0)
		{	
			if(onload == true)
			{
				menuhide[i + 1] = true;
			}
			else
			{
				menuhide[i + 1] = menuhide[i + 1]
			}
			for (j=0;j<submenu.length;j++)
			{
				submenu1 = submenu[j].getElementsByTagName("submenu1") //lay menu con cua menu cap 2
				if(submenu1.length > 0)
				{
					var i1 = i + 1;
					var j1 = j + 1;
					var strtemp = '1' + i1 + '' + j1;
					if(onload == true)
					{
						menuhide[parseInt(strtemp)] = true;
					}
					else
					{
						if(menuhide[i + 1] == true)
						{
							menuhide[parseInt(strtemp)] = true;
						}
					}
				}
			}
		}
	}
}


function loadtopmenu(menuid,menuindex)
{
	var _str = createtopmenu(menuindex);
	var _arrstr = _str.split('#*#');
	document.getElementById(menuid).innerHTML = _arrstr[0];//createtopmenu(menuindex);
	document.getElementById('toplinemenu').innerHTML = _arrstr[1];
	//alert(_arrstr[1]);
	//linehoveractive('topmenu' + menuindex + '\'' , 'topmenu')
}

function loadtoplinehover(topmenuid, maintagid)
{
	var mx = document.getElementById(maintagid).offsetLeft;
	var my = document.getElementById(maintagid).offsetTop;
	var x = document.getElementById(topmenuid).offsetLeft;
	var y = document.getElementById(topmenuid).offsetTop;
	var h = document.getElementById(maintagid).offsetHeight;
	var _top = my - 6;
	var _left = mx + x;
	document.getElementById('toplinehover').style.top = _top;
	document.getElementById('toplinehover').style.left = _left;
	document.getElementById('toplinehover').style.display = 'block';
	//alert(mx + ' ' + x);
}

function linehoveractive(topmenuid, maintagid)
{
	var mx = document.getElementById(maintagid).offsetLeft;
	var my = document.getElementById(maintagid).offsetTop;
	var x = document.getElementById(topmenuid).offsetLeft;
	var y = document.getElementById(topmenuid).offsetTop;
	var h = document.getElementById(maintagid).offsetHeight;
	var _top = my;
	var _left = mx + x;
	//document.getElementById('linehoveractive').style.top = _top;
	document.getElementById('linehoveractive').style.left = _left;
	document.getElementById('linehoveractive').style.display = 'block';
	//alert(my + ' ' + y); navigator.appName
}




function createtopmenu(menuindex)
{
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("GET","menu.xml",false);
	xmlhttp.send();
	xmlDoc=xmlhttp.responseXML; 
	var x=xmlDoc.getElementsByTagName("menu"); //lay danh sach menu cap 1
	var strline = '<ul>';
	var strtopmenu = '<ul>';
	for (i=0;i<x.length - 2;i++)
	{
		var i1 = i + 1;
		var submenu = x[i].getElementsByTagName("submenu");
		if(i == menuindex)
		{
			strtopmenu += '<li class="active" id="topmenu' + i + '">';
			strline += '<li class="lineactive"><div id="topline' + i + '"></div></li>';
		}
		else
		{			
			strtopmenu += '<li id="topmenu' + i + '">';
			strline += '<li><div id="topline' + i + '"></div></li>';
		}
		if(x[i].getAttribute("url") == '#')
		{
			strtopmenu += '<a href="#" ';
			strtopmenu += 'onmousemove="loadtopsubmenu(\'topmenu' + i + '\', \'topmenu\');loadtoplinehover(\'topmenu' + i + '\', \'topmenu\')" ';
			strtopmenu += 'onmouseout="hidetopsubmenu(\'topmenu' + i + '\')" ';
			if(x[i].getAttribute("action") == "")
			{
				strtopmenu += 'onclick="';
			}
			else
			{
				strtopmenu += 'onclick="' + x[i].getAttribute("action") + ';';
			}			
			strtopmenu += 'loadtopmenu(\'hmenu\',' + i + ');submenuclick(' + i + ',-1)';
			strtopmenu += ';submenu1click(' + i + ',-1,-1)';
			if(submenu.length > 0)
			{
				strtopmenu += ';showhidemenu(\'submenu' + i1 + '\',0)';
			}
			strtopmenu += ';treeclick(' + x[i].getAttribute("index") + ')';
			strtopmenu += ';loadtreemenu(\'lefttreemenu\',' + x[i].getAttribute("index") + ')';
			strtopmenu += ';createfootermenu(\'footermenu\',' + i + ')';
			strtopmenu += '" >';
		}
		else
		{
			strtopmenu += '<a href="#"';
			strtopmenu += ' onmousemove="loadtopsubmenu(\'topmenu' + i + '\', \'topmenu\');loadtoplinehover(\'topmenu' + i + '\', \'topmenu\')"';
			strtopmenu += ' onmouseout="hidetopsubmenu(\'topmenu' + i + '\')"';
			if(x[i].getAttribute("action") == "")
			{
				strtopmenu += ' onclick="ajaxpage(\'contents/' + x[i].getAttribute("url") + '\', \'content\');';
				
			}
			else
			{
				strtopmenu += 'onclick="' + x[i].getAttribute("action") + ';';
			}
			strtopmenu += 'loadtopmenu(\'hmenu\',' + i + ');submenuclick(' + i + ',-1)';
			strtopmenu += ';submenu1click(' + i + ',-1,-1)';
			if(submenu.length > 0)
			{
				strtopmenu += ';showhidemenu(\'submenu' + i1 + '\',0)';
			}
			strtopmenu += ';treeclick(' + x[i].getAttribute("index") + ')';
			strtopmenu += ';loadtreemenu(\'lefttreemenu\',' + x[i].getAttribute("index") + ')';
			strtopmenu += ';createfootermenu(\'footermenu\',' + i + ')';
			strtopmenu += '" >';
		}		
		strtopmenu += x[i].getAttribute("name");
		strtopmenu += '</a></li>';
	}
	strtopmenu += '</ul>';
	strline += '</ul>';
	var _str = strtopmenu + '#*#' + strline;
	return _str; //strtopmenu;
}

function createtopsubmenu(topmenuid)
{
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("GET","menu.xml",false);
	xmlhttp.send();
	xmlDoc=xmlhttp.responseXML; 
	var submenu;
	var submenu1;
	var x=xmlDoc.getElementsByTagName("menu"); //lay danh sach menu cap 1
	var menuindex = parseInt(topmenuid.match(/\d+$/));
	//var _getlen = getlentopsubmenu(topmenuid);
	var strtopsubmenu = "";
	for (i=0;i<x.length - 2;i++)
	{
		var i1 = i + 1;
		submenu = x[i].getElementsByTagName("submenu") //lay menu con cua menu cap 1 thu i
		
		if((submenu.length > 0) && (i == menuindex))
		{	
			strtopsubmenu += '<ul>';
			for (j=0;j<submenu.length;j++)
			{
				if((j == submenuact) && (i == topmenuact))
				{
					strtopsubmenu += '<li class="subactive" id="topsubmenul' + j + '">';
				}
				else
				{
					strtopsubmenu += '<li id="topsubmenul' + j + '">';
				}
				
				strtopsubmenu += '<a href="';
				var strurl = submenu[j].getAttribute("url");
				var arrurl = submenu[j].getAttribute("url").split('#');
				if(strurl.indexOf('#') > 0)
				{					
					strtopsubmenu += '#' + arrurl[1] + '"';
					//strtopsubmenu += ' onclick="ajaxpage(\'contents/' + arrurl[0] + '\', \'content\');clicklink(\'#' + arrurl[1] +'\')"';
				}
				else
				{
					strtopsubmenu += '#"';
					//strtopsubmenu += ' onclick="ajaxpage(\'contents/' + arrurl[0] + '\', \'content\')"';
				}
				strtopsubmenu += ' onmousemove="showtopsubmenu1(\'topmenu' + i + '\');loadtopsubmenu1(\'topmenu' + i + '\',\'topsubmenul' + j + '\', \'topmenu\');loadtoplinehover(\'topmenu' + i + '\', \'topmenu\')"';
				strtopsubmenu += ' onmouseout="hidetopsubmenu(\'topmenu' + i + '\')"';
				if(submenu[j].getAttribute("action") == "")
				{
					strtopsubmenu += ' onclick="ajaxpage(\'contents/' + arrurl[0] + '\', \'content\')';
				}
				else
				{
					strtopsubmenu += ' onclick="' + submenu[j].getAttribute("action");
				}
				strtopsubmenu += ';submenuclick(' + i + ',' + j + ');loadtopmenu(\'hmenu\',' + i + ')';
				strtopsubmenu += ';showhidemenu(\'submenu' + i1 + '\',0)';
				strtopsubmenu += ';createfootermenu(\'footermenu\',' + i + ')';
				strtopsubmenu += ';treeclick(' + submenu[j].getAttribute("index") + ');loadtreemenu(\'lefttreemenu\',' + submenu[j].getAttribute("index") + ')">';
				//location.href = els[i].href;
				/*if(j == _getlen)
				{
					strtopsubmenu += '<div id="getmenulen">';
				}*/
				strtopsubmenu += submenu[j].getAttribute("name");
				/*if(j == _getlen)
				{
					strtopsubmenu += '</div>';
				}*/
				strtopsubmenu += '</a></li>';
			}
			strtopsubmenu += '</ul>';
		}
	}
	return strtopsubmenu;
}

function submenuclick(topindex, subindex)
{	
	submenuact = subindex;
	topmenuact = topindex
	//location.href = _link;
	//var click = document.getElementById(_link).click();
}

function getlentopsubmenu(topmenuid)
{
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("GET","menu.xml",false);
	xmlhttp.send();
	xmlDoc=xmlhttp.responseXML; 
	var submenu;
	var submenu1;
	var _str = "";
	var lenindex;
	var x=xmlDoc.getElementsByTagName("menu"); //lay danh sach menu cap 1
	var menuindex = parseInt(topmenuid.match(/\d+$/));
	for (i=0;i<x.length;i++)
	{
//		var i1 = i + 1;
		submenu = x[i].getElementsByTagName("submenu") //lay menu con cua menu cap 1 thu i
		
		if((submenu.length > 0) && (i == menuindex))
		{	
			for (j=0;j<submenu.length;j++)
			{
				var lenstr = submenu[j].getAttribute("name");
				if(lenstr.length > _str.length)
				{
					_str = lenstr
					lenindex = j;
				}
			}
		}
	}
	return lenindex;
}


function loadtopsubmenu(topmenuid, maintagid)
{
	var mx = document.getElementById(maintagid).offsetLeft;
	var my = document.getElementById(maintagid).offsetTop;
	var x = document.getElementById(topmenuid).offsetLeft;
	var y = document.getElementById(topmenuid).offsetTop;
	var h = document.getElementById(maintagid).offsetHeight;
	var _top = y + h;
	var _left = x - 1;
	document.getElementById('topsubmenu').style.top = _top;
	document.getElementById('topsubmenu').style.left = _left;	
	document.getElementById('topsubmenu').innerHTML = createtopsubmenu(topmenuid);
	document.getElementById('topsubmenu').style.display = 'block';
	//var _width = document.getElementById('getmenulen').clientWidth;
	//document.getElementById('topsubmenu').style.Width = _width + 'px';
	document.getElementById(topmenuid).style.backgroundImage = 'url("images/topmenuhover.png")';
	var menuindex = parseInt(topmenuid.match(/\d+$/));
	//document.getElementById('topline' + menuindex).style.backgroundImage = 'url("images/linehover.png")';
	//document.getElementById('topline' + menuindex).style.background = 'background-image: url("images/linehover.png") repeat-x';
	//document.getElementById(topmenuid).style.color = "white"
	//document.getElementById('output').innerHTML = document.getElementById('topsubmenu').offsetWidth + '  ' + _width; 
	//document.getElementById('output1').innerHTML = 'top = ' + y + h + '; left = ' + x + '; left = ' + mx2; 
}

function hidetopsubmenu(topmenuid)
{
	document.getElementById(topmenuid).style.backgroundImage = 'url("images/topmenu.png")';
	document.getElementById('topsubmenu').style.display = 'none';
	document.getElementById('topsubmenu1').style.display = 'none';
	document.getElementById('toplinehover').style.display = 'none';//none
}

function showtopsubmenu(topmenuid)
{
	document.getElementById(topmenuid).style.backgroundImage = 'url("images/topmenuhover.png")';
	var menuindex = parseInt(topmenuid.match(/\d+$/));
	document.getElementById('topline' + menuindex).style.backgroundImage = 'url("images/linehover.png")';
	document.getElementById('topsubmenu').style.display = 'block';	
	document.getElementById('toplinehover').style.display = 'block';
}

function showtopsubmenu1(topmenuid)
{
	document.getElementById(topmenuid).style.backgroundImage = 'url("images/topmenuhover.png")';
	var menuindex = parseInt(topmenuid.match(/\d+$/));
	document.getElementById('topline' + menuindex).style.backgroundImage = 'url("images/linehover.png")';	
	document.getElementById('topsubmenu').style.display = 'block';
	document.getElementById('topsubmenu1').style.display = 'block';
	document.getElementById('toplinehover').style.display = 'block';
}


function loadtopsubmenu1(topmenuid, topsubmenuid, maintagid)
{
	var mx = document.getElementById(maintagid).offsetLeft;
	var my = document.getElementById(maintagid).offsetTop;
	var x = document.getElementById(topmenuid).offsetLeft;
	var W = document.getElementById(topsubmenuid).offsetWidth;
	var y = document.getElementById(topsubmenuid).offsetTop;
	var h = document.getElementById(maintagid).offsetHeight;
	var _top = y + h;
	var _left = x + W - 1;
	document.getElementById('topsubmenu1').style.top = _top;
	document.getElementById('topsubmenu1').style.left = _left - 15;
	document.getElementById('topsubmenu1').style.display = 'block';
	document.getElementById('topsubmenu1').innerHTML = createtopsubmenu1(topmenuid, topsubmenuid);		
	//document.getElementById('output').innerHTML = 'mx = ' + mx + '; my = ' + my + '; x = ' + x + '; y = ' + y + '; h = ' + h; 
	//var menuindex11 = parseInt(topsubmenuid.match(/\d+$/));
	//document.getElementById('output1').innerHTML = 'top = ' + menuindex11; 
}

function createtopsubmenu1(topmenuid,topsubmenuid)
{
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("GET","menu.xml",false);
	xmlhttp.send();
	xmlDoc=xmlhttp.responseXML; 
	var submenu;
	var submenu1;
	var x=xmlDoc.getElementsByTagName("menu"); //lay danh sach menu cap 1
	var menuindex = parseInt(topmenuid.match(/\d+$/));
	var menuindex1 = parseInt(topsubmenuid.match(/\d+$/));
	var strtopsubmenu1 = "";
	for (i=0;i<x.length -2 ;i++)
	{
		var i1 = i + 1;
		if(i == menuindex)
		{
			submenu = x[i].getElementsByTagName("submenu") //lay menu con cua menu cap 1 thu i		
			if(submenu.length > 0)
			{				
				for (j=0;j<submenu.length;j++)
				{
					var j1 = j + 1;
					if(j == menuindex1)
					{
						submenu1 = submenu[j].getElementsByTagName("submenu1") //lay menu con cua menu cap 2
						if(submenu1.length > 0)
						{
							strtopsubmenu1 += '<ul>';
							for(k=0;k<submenu1.length;k++)
							{
								if((i == topmenuact) && (j == submenuact) && (k == submenuact1))
								{
									strtopsubmenu1 += '<li class="sub1active">';
								}
								else
								{
									strtopsubmenu1 += '<li>';								
								}
								strtopsubmenu1 += '<a href="';
								var strurl = submenu1[k].getAttribute("url");
								var arrurl = submenu1[k].getAttribute("url").split('#');
								if(strurl.indexOf('#') > 0)
								{
									strtopsubmenu1 += '#' + arrurl[1] + '"';
								}
								else
								{
									strtopsubmenu1 += '#"';
								}
								strtopsubmenu1 += ' onmousemove="showtopsubmenu1(\'topmenu' + i + '\');loadtoplinehover(\'topmenu' + i + '\', \'topmenu\')"'
								strtopsubmenu1 += ' onmouseout="hidetopsubmenu(\'topmenu' + i + '\')"';
								if(submenu1[k].getAttribute("action") == "")
								{
									strtopsubmenu1 += ' onclick="ajaxpage(\'contents/' + arrurl[0] + '\', \'content\');';
								}
								else
								{
									strtopsubmenu1 += ' onclick="' + submenu1[k].getAttribute("action") + ';';
								}								
								strtopsubmenu1 += 'loadtopmenu(\'hmenu\',' + i + ');showhidemenu(\'submenu' + i1 + '\',0);showhidemenu(\'submenu1' + i1 + '' + j1 + '\',0)';								
								strtopsubmenu1 += ';submenuclick(' + i + ',' + j + ')';
								strtopsubmenu1 += ';submenu1click(' + i + ',' + j + ',' + k + ')';
								strtopsubmenu1 += ';createfootermenu(\'footermenu\',' + i + ')';
								strtopsubmenu1 += ';treeclick(' + submenu1[k].getAttribute("index") + ');loadtreemenu(\'lefttreemenu\',' + submenu1[k].getAttribute("index") + ')">';
								strtopsubmenu1 += submenu1[k].getAttribute("name");								
								strtopsubmenu1 += '</a></li>';
							}
							strtopsubmenu1 += '</ul>';
						}
					}
				}
				
			}
		}
	}
	return strtopsubmenu1;
}

function submenu1click(topindex, subindex, sub1index)
{
	topmenuact = topindex;
	submenuact = subindex;
	submenuact1 = sub1index;
}


function createfootermenu(footermenuid,_index)
{
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("GET","menu.xml",false);
	xmlhttp.send();
	xmlDoc=xmlhttp.responseXML; 
	var x=xmlDoc.getElementsByTagName("menu"); //lay danh sach menu cap 1
	var strbottommenu = "";
	for (i=0;i<x.length - 1;i++)
	{
		var submenu = x[i].getElementsByTagName("submenu");
		var i1 = i + 1;
		if(i == _index)
		{
			strbottommenu += '<span class="factive">';
		}
		strbottommenu += '<a href="#" ';
		
		/*if(i == x.length - 1)
		{
			strbottommenu += 'style="border-right:0px;"';
		}*/
		strbottommenu += ' onclick="';
		if(x[i].getAttribute("url") != '#')
		{
			strbottommenu += 'ajaxpage(\'contents/' + x[i].getAttribute("url") + '\', \'content\');';
		}
		strbottommenu += 'createfootermenu(\'footermenu\',' + i + ')';
		strbottommenu += ';loadtopmenu(\'hmenu\',' + i + ')';
		strbottommenu += ';submenuclick(' + i + ',-1);submenu1click(' + i + ',-1,-1)';
		if(submenu.length > 0)
		{
			strbottommenu += ';showhidemenu(\'submenu' + i1 + '\',0)';
		}
		strbottommenu += ';treeclick(' + x[i].getAttribute("index") + ')';
		strbottommenu += ';loadtreemenu(\'lefttreemenu\',' + x[i].getAttribute("index") + ')';
		strbottommenu += '">';
		//strtopsubmenu1 += 'onmousemove="showtopsubmenu1(\'topmenu' + i + '\')" onmouseout="hidetopsubmenu(\'topmenu' + i + '\')">';
		strbottommenu += x[i].getAttribute("name");								
		strbottommenu += '</a>';
		if(i == _index)
		{
			strbottommenu += '</span>';
		}
	}
	strbottommenu += '<a href="#" style="border-right:0px;"';
	strbottommenu += ' onclick="createsitemap(\'content\')"';
	strbottommenu += '>';
	strbottommenu += x[x.length - 1].getAttribute("name");
	strbottommenu += '</a>';
	document.getElementById(footermenuid).innerHTML = strbottommenu; 
}


function loadslideshow(slideshowid)
{
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("GET","slideshow.xml",false);
	xmlhttp.send();
	xmlDoc=xmlhttp.responseXML; 
	var x=xmlDoc.getElementsByTagName("image"); //lay danh sach menu cap 1
	var strimg = '<div class="neoslideshow">';
	for (i=0;i<x.length;i++)
	{
		strimg += '<img src="images/slide/' + x[i].getAttribute("url") + '" width="984" height="84"/>';
	}
	strimg += '</div>';
	document.getElementById(slideshowid).innerHTML = strimg;
}

function loadadvertise(advertiseid)
{
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("GET","advertise.xml",false);
	xmlhttp.send();
	xmlDoc=xmlhttp.responseXML; 
	var x=xmlDoc.getElementsByTagName("advertise"); //lay danh sach menu cap 1
	var strimg = '';
	for (i=0;i<x.length;i++)
	{
		var strurl = x[i].getAttribute("url");
		if(strurl.indexOf('.swf') > 0)
		{
			strimg += '<object type="application/x-shockwave-flash" data="images/advertise/';
			strimg += x[i].getAttribute("url") + '" height=' + x[i].getAttribute("height") + ' >';
			strimg += '<param name="movie" value="images/advertise/' + x[i].getAttribute("url") + '"/>';
			strimg += '<param name="quality" value="high"/>';
			strimg += '<param name="wmode" value="transparent"/>';
			strimg += '<embed src="images/advertise/' + x[i].getAttribute("url") + '" quality="high" bgcolor="#ffffff"';
			strimg += 'name="advertise" align="" type="application/x-shockwave-flash" ';
			strimg += 'height=' + x[i].getAttribute("height") + ' ';
			strimg += 'pluginspage="http://www.macromedia.com/go/getflashplayer"></embed> ';
			strimg += '</object>';
		}
		else
		{
			strimg += '<img src="images/advertise/' + x[i].getAttribute("url") + '"';
			strimg += 'style="height=\'' + x[i].getAttribute("height") + 'px\';" />';
		}			
	}
	//strimg += '</div>';
	document.getElementById(advertiseid).innerHTML = strimg;
}

/*


<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" 

codebase="http://download.macromedia.com/pub/shockwave/
cabs/flash/swflash.cab#version=6,0,40,0" 
 
width="468" height="60" 
 id="mymoviename"> 

<param name="movie"  

value="example.swf" /> 
 
<param name="quality" value="high" /> 

<param name="bgcolor" value="#ffffff" /> 



width="468" height="60" 

name="mymoviename" align="" type="application/x-shockwave-flash" 

pluginspage="http://www.macromedia.com/go/getflashplayer"> 


</embed> 

</object>*/

function fixlineactive()
{
		var mx = document.getElementById('topmenu').offsetLeft;
		var x = document.getElementById('topmenu0').offsetLeft;
		var _left = mx + x;
		document.getElementById('linehoveractive').style.left = _left;		
}

function main()
{
	createarraytmenuhide(true);
	loadtreemenu('lefttreemenu',1);	
	loadtopmenu('hmenu',0);
	//linehoveractive('topmenu0','toplinemenu');
	createfootermenu('footermenu',0);
	loadslideshow('slideshow');
	loadadvertise('rightcontent');
	//fixlineactive()
	$(function() {
		$('.neoslideshow img:gt(0)').hide();
		setInterval(function(){
		  $('.neoslideshow :first-child').fadeOut()
			 .next('img').fadeIn()
			 .end().appendTo('.neoslideshow');},
		  5000);
	})
}


function createsitemap(sitemapid)
{
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("GET","menu.xml",false);
	xmlhttp.send();
	xmlDoc=xmlhttp.responseXML; 
	var submenu;
	var submenu1;
	var x=xmlDoc.getElementsByTagName("menu"); //lay danh sach menu cap 1
	var strtreemenu = '';
	strtreemenu = '<div id="mainsitemap">';
	strtreemenu += '<div id="title1">Milton building services sitemap</div>';
	for (i=0;i<x.length;i++)
	{
		var i1 = i + 1;
		submenu = x[i].getElementsByTagName("submenu") //lay menu con cua menu cap 1 thu i
		strtreemenu += '<div class="node">';
		if(submenu.length > 0) //menu co submenu
		{
			if(i == x.length - 1)
			{
				strtreemenu += '<img src="images/ftv2mlastnode.gif" />';
			}
			else
			{
				strtreemenu += '<img src="images/ftv2mnode.gif" />';
			}
		}
		else
		{
			if(i == x.length - 1)
			{
				strtreemenu += '<img src="images/ftv2lastnode.gif" />';
			}
			else
			{
				strtreemenu += "<img src='images/ftv2node.gif' />";
			}			
		}		
		strtreemenu += '<a href="#"';
		if(x[i].getAttribute("url") == '#')
		{
			//strtreemenu += ' onclick="showhidemenu(\'submenu' + i1 + '\');loadtreemenu(\'' + menuid + '\')"';
		}
		else
		{
			//strtreemenu += ' onclick="showhidemenu(\'submenu' + i1 + '\');loadtreemenu(\'' + menuid + '\');';
			if(x[i].getAttribute("action") == "")
			{
				strtreemenu += ' onclick="ajaxpage(\'contents/' + x[i].getAttribute("url") + '\', \'content\')"';
			}
			else
			{
				strtreemenu += ' onclick="' + x[i].getAttribute("action") + '"';
			}
		}
		//strtreemenu += x[i].getAttribute("url");
		strtreemenu += '>';
		strtreemenu += x[i].getAttribute("name");	
		strtreemenu += '</a></div>';		
		if(submenu.length > 0)
		{	
			strtreemenu += '<div class="treesitemap">';			
			for (j=0;j<submenu.length;j++)
			{
				var j1 = j + 1;
				submenu1 = submenu[j].getElementsByTagName("submenu1") //lay menu con cua menu cap 2
				var inttemp = parseInt('1' + i1 + '' + j1);
				strtreemenu += '<div class="subnode">';
				if(j == submenu.length - 1) //neu la menu con cuoi cung
				{
					if(submenu1.length > 0) //menu con cap 2 ton tai menu con cap 3
					{
						strtreemenu += '<img src="images/ftv2mlastnode.gif" />';
					}
					else
					{
						strtreemenu += '<img src="images/ftv2lastnode.gif" />';
					}
				}
				else
				{
					if(submenu1.length > 0)
					{
						strtreemenu += '<img src="images/ftv2mnode.gif" />';
					}
					else
					{
						strtreemenu += '<img src="images/ftv2node.gif" />';
					}				
				}
				strtreemenu += '<a href="';
				var strurl = submenu[j].getAttribute("url");
				var arrurl = submenu[j].getAttribute("url").split('#');
				if(strurl.indexOf('#') > 0)
				{
					strtreemenu += '#' + arrurl[1] + '"';							
				}
				else
				{
					strtreemenu += '#"';
				}
				if(submenu[j].getAttribute("action") == "")
				{
					strtreemenu += ' onclick="ajaxpage(\'contents/' + arrurl[0] + '\', \'content\')"';
				}
				else
				{
					strtreemenu += ' onclick="' + submenu[j].getAttribute("action") + '"';
				}
				strtreemenu += '>';
				strtreemenu += submenu[j].getAttribute("name");
				strtreemenu += '</a></div>';
				
				if(submenu1.length > 0)
				{
					strtreemenu += '<div class="treesubsitemap">';
					for (k=0;k<submenu1.length;k++)
					{
						strtreemenu += '<div class="subnode">';
						if(k == submenu1.length -1)
						{
							strtreemenu += '<img src="images/ftv2lastnode.gif" />';
						}
						else
						{
							strtreemenu += "<img src='images/ftv2node.gif' />";
						}
						//strtreemenu += '<a href="' + submenu1[k].getAttribute("url") + '">';
						strtreemenu += '<a href="';
						strurl = submenu1[k].getAttribute("url");
						arrurl = submenu1[k].getAttribute("url").split('#');
						if(strurl.indexOf('#') > 0)
						{
							strtreemenu += '#' + arrurl[1] + '"';							
						}
						else
						{
							strtreemenu += '#';
						}
						if(submenu1[k].getAttribute("action") == "")
						{
							strtreemenu += ' onclick="ajaxpage(\'contents/' + arrurl[0] + '\', \'content\')"';
						}
						else
						{
							strtreemenu += ' onclick="' + submenu1[k].getAttribute("action") + '"';
						}
						
						strtreemenu += '>';
						strtreemenu += submenu1[k].getAttribute("name");					
						strtreemenu += '</a></div>';
					}
					strtreemenu += '</div>';
				}
			}			
			strtreemenu += '</div>';
		}
	}
	strtreemenu += '</div>';
	document.getElementById(sitemapid).innerHTML = strtreemenu;
}


/*if(submenu1[k].getAttribute("action") == "")
								{
									strtopsubmenu1 += ' onclick="ajaxpage(\'contents/' + arrurl[0] + '\', \'content\');';
								}
								else
								{
									strtopsubmenu1 += ' onclick="' + submenu1[k].getAttribute("action") + ';';
								}	*/

function loadproject(projectfile)
{
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.open("GET",projectfile,false);
	xmlhttp.send();
	xmlDoc = xmlhttp.responseXML; 
	var x = xmlDoc.getElementsByTagName("title"); 
	protitle = x[0].getAttribute("name");
	x = xmlDoc.getElementsByTagName("image");
	xmlfile = x;
}

function progallery(contentid, indexpage)
{
	var strimg = '';
	var strpage = '';
	var maxpage = 0;
	if((xmlfile.length % 2) == 0)
	{
		maxpage = xmlfile.length / 2;
	}
	else
	{
		maxpage = (xmlfile.length + 1) / 2;
	}
	strimg += '<div id="protitle">' + protitle + '</div>';
	//strpage += '<div id="gallery"><a href="#" onclick="proclick(1);loadproject(\'content\',\'' + projectfile + '\',1)">Firrst page</a> | ';
	//alert(indexpage + '  ' + maxpage);
	if(((xmlfile.length % 2) != 0) && (indexpage == maxpage))
	{
		strimg += '<div class="imgproject">';
		strimg += '<img src="images/projects/' + xmlfile[((indexpage * 2) - 2)].getAttribute("url") + '" />';
		strimg += '<div class="prodesc">' + xmlfile[((indexpage * 2) - 2)].getAttribute("name") + '</div>';
		strimg += '<div class="prodesc">' + xmlfile[((indexpage * 2) - 2)].getAttribute("address") + '</div>';
		strimg += '</div>';	
		
	}
	else
	{
		strimg += '<div class="imgproject">';
		strimg += '<img src="images/projects/' + xmlfile[((indexpage * 2) - 2)].getAttribute("url") + '" />';
		strimg += '<div class="prodesc">' + xmlfile[((indexpage * 2) - 2)].getAttribute("name") + '</div>';
		strimg += '<div class="prodesc">' + xmlfile[((indexpage * 2) - 2)].getAttribute("address") + '</div>';
		strimg += '</div>';
		
		
		strimg += '<div class="imgproject">';
		strimg += '<img src="images/projects/' + xmlfile[((indexpage * 2) - 1)].getAttribute("url") + '" />';
		strimg += '<div class="prodesc">' + xmlfile[((indexpage * 2) - 1)].getAttribute("name") + '</div>';
		strimg += '<div class="prodesc">' + xmlfile[((indexpage * 2) - 1)].getAttribute("address") + '</div>';
		strimg += '</div>';
	}	
		
	if(procurpage == 1)
	{
		strpage += '<div id="gallery">Firrst page | ';
		strpage += '&lt;Prev page';
	}
	else
	{
		strpage += '<div id="gallery"><a href="#" onclick="proclick(1);progallery(\'content\',1)">Firrst page</a> | ';
		var prevpage = procurpage - 1;
		strpage += '<a href="#" onclick="proclick(' + prevpage + ');progallery(\'content\',' + prevpage + ')">&lt;Prev page</a>';
	}	
	if(maxpage < 6)
	{
		for(i = 1; i < maxpage + 1; i++ )
		{
			if(i == indexpage)
			{
				strpage += ' | <span  class="pageactive">' + i + '</span>';
			}
			else
			{
				strpage += ' | <a href="#" onclick="proclick(' + i + ');progallery(\'content\',' + i + ')">' + i + '</a>';
			}
		}
	}
	else
	{
		if(indexpage > 3)
		{
			strpage += ' ... ';
			if(indexpage < maxpage - 2)
			{
				for(i = indexpage - 2; i <= indexpage + 2; i++)
				{
					if(i == indexpage)
					{
						strpage += ' | <span  class="pageactive">' + i + '</span>';
					}
					else
					{
						strpage += ' | <a href="#" onclick="proclick(' + i + ');progallery(\'content\',' + i + ')">' + i + '</a>';
					}
				}
				strpage += ' ... ';
			}
			else
			{
				for(i = maxpage - 4; i <= maxpage; i++)
				{
					if(i == indexpage)
					{
						strpage += ' | <span  class="pageactive">' + i + '</span>';
					}
					else
					{
						strpage += ' | <a href="#" onclick="proclick(' + i + ');progallery(\'content\',' + i + ')">' + i + '</a>';
					}
				}
			}
		}
		else
		{
			if(indexpage > 2)
			{
				for(i = indexpage - 2; i <= indexpage + 2; i++)
				{
					if(i == indexpage)
					{
						strpage += ' | <span  class="pageactive">' + i + '</span>';
					}
					else
					{
						strpage += ' | <a href="#" onclick="proclick(' + i + ');progallery(\'content\',' + i + ')">' + i + '</a>';
					}
				}
			}
			else
			{
				for(i = 1; i <= 5; i++)
				{
					if(i == indexpage)
					{
						strpage += ' | <span  class="pageactive">' + i + '</span>';
					}
					else
					{
						strpage += ' | <a href="#" onclick="proclick(' + i + ');progallery(\'content\',' + i + ')">' + i + '</a>';
					}
				}
			}
			strpage += ' ... ';
		}
	
	}
	if(procurpage == maxpage)
	{
		strpage += ' Next page&gt;';
	}
	else
	{
		var nextpage = procurpage + 1;
		strpage += ' <a href="#" onclick="proclick(' + nextpage + ');progallery(\'content\',' + nextpage + ')">Next page&gt;</a>';
	}
	strpage += '</div>';
	strimg += strpage;
	document.getElementById(contentid).innerHTML = strimg;
}


function proclick(_index)
{
	procurpage = _index;
	//alert(_index);
}


/*
<object type="application/x-shockwave-flash" data="images/chu.swf" width="623" height="39"> 
<param name="movie" value="images/chu.swf" /> 
<param name="quality" value="high"/> 
<param name="wmode" value="transparent"/> </object>

Link: http://www.ddth.com/showthread.php/241026-H%E1%BB%8Fi-code-ch%C3%A8n-flash-swf-v%C3%A0o-web#ixzz1Yq62pWRt

<div id="text" style="position:absolute;visibility:hidden" >This is some text</div>
<input type="button" onclick="getWidth()" value="Go" />
<script type="text/javascript" >
    function getWidth() {
        var width = document.getElementById("text").clientWidth;
        alert(" Width :"+  width);
    }
</script>*/
