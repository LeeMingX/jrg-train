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

var specials = document.querySelectorAll("[data-x]")

function find_min(n) {
    var min = Number.MAX_VALUE;
    for (var sn = 0; sn < n.length; ++sn) {
        if (n[sn] < min) {
            min = n[sn];
        }
    }
    return min;
}

setTimeout(() => {
    window.scrollTo(0, 1);
}, 1000)

window.onscroll = function (event) {
    var y = window.scrollY;
    var navbar = document.getElementById("top");
    if (y > 0) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }

    var minimal_distance = [];
    for (var i = 0; i < specials.length; ++i) {
        minimal_distance.push(Math.abs(y - specials[i].offsetTop));
    }
    for (var i = 0; i < specials.length; ++i) {
        if (i === minimal_distance.indexOf(find_min(minimal_distance))) {
            if (specials[i].id === "siteSkills") {
                var prs = document.querySelectorAll(".progress");
                for (var j = 0; j < prs.length; ++j) {
                    prs[j].classList.remove("allleft");
                }
            }
            var a = document.querySelector("a[href='#" + specials[i].id + "']");
            a.parentNode.classList.add("highlight");
            specials[i].classList.add("offset")
        } else {
            if (specials[i].id === "siteSkills") {
                var prs = document.querySelectorAll(".progress");
                for (var j = 0; j < prs.length; ++j) {
                    prs[j].classList.add("allleft");
                }
            }
            var a = document.querySelector("a[href='#" + specials[i].id + "']");
            a.parentNode.classList.remove("highlight");
            specials[i].classList.remove("offset")
        }
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
        var t = Math.abs((goal - begin) / 500);
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