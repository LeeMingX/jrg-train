all.onclick = function () {
    progress.className = "fillbar";
};
frame.onclick = function () {
    progress.className = "fillbar1";
};
js.onclick = function () {
    progress.className = "fillbar2";
};
setTimeout(function () {
    document.getElementById("site-welcome").className = "mainpage-active";
}, 1000);
window.onscroll = function (event) {
    var y = window.scrollY;
    var navbar = document.getElementById("top");
    if (y > 0) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
};
var submenus = document.querySelectorAll("nav>#navbar>li");
for (var i = 0; i < submenus.length; ++i) {
    submenus[i].onmouseenter = function (event) {
        event.currentTarget.classList.add("active");
    };
    submenus[i].onmouseleave = function (event) {
        event.currentTarget.classList.remove("active");
    };
}
var navlinks = document.querySelectorAll("nav>#navbar>li>a");
for (var i = 0; i < navlinks.length; ++i) {
    navlinks[i].onclick = function (event) {
        event.preventDefault();
        var top = document.querySelector(
            event.currentTarget.getAttribute("href")
        ).offsetTop;
        var begin = window.pageYOffset;
        var goal = top - 50;
        // Setup the animation loop.
        function animate(time) {
            requestAnimationFrame(animate);
            TWEEN.update(time);
        }
        requestAnimationFrame(animate);
        var t = Math.abs((goal-begin)/500);
        if (t > 3) t = 3;

        var coords = {
            x: 0,
            y: begin
        }; // Start at (0, 0)
        var tween = new TWEEN.Tween(coords) // Create a new tween that modifies 'coords'.
            .to({
                x: 0,
                y: goal
            }, t * 1000) // Move to (300, 200) in 1 second.
            .easing(TWEEN.Easing.Quadratic.InOut) // Use an easing function to make the animation smooth.
            .onUpdate(function () { // Called after tween.js updates 'coords'.
                // Move 'box' to the position described by 'coords' with a CSS translation.
                window.scrollTo(0, coords.y);
            })
            .start(); // Start the tween immediately.
    };
}