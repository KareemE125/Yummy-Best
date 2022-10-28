function toggleDrawerIcon()
{
    const drawerIcon =  $("nav #drawer #open-btn").eq(0);
    if( drawerIcon.hasClass('fa-bars') )
    {
        drawerIcon.removeClass('fa-bars');
        drawerIcon.addClass('fa-close');
    }
    else
    {
        drawerIcon.removeClass('fa-close');
        drawerIcon.addClass('fa-bars');
    }
}

function animateLinks()
{
    const links = $("nav ul li");

    if(links.eq(0).css('top') === "269.438px")
    {
        let top = 5;
        let i = 0;
        const interval = setInterval(() => {
            links.eq(i).animate({'top':`${top}%`},500,'easeInSine');
            top += 18;
            i++;
            if(i == links.length){  clearInterval(interval); }
        }, 200);    
    }
    else
    {
        links.animate({'top':`100%`},400)
    }
}

function toggoleSideDrawer()
{
    const sideBarWidth = $("nav .links").outerWidth();

    toggleDrawerIcon();
    animateLinks();
    $("nav").animate(
        {"left": $("nav").css("left") === '0px'? `-${sideBarWidth}px` : '0px' },
        500,
        'easeOutExpo'
    );
}


$("nav #drawer #open-btn").on('click', toggoleSideDrawer)

$("nav .links li").on('click', toggoleSideDrawer)