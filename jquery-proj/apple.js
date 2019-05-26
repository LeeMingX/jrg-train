$imgs = $("#floatpage> img")
$btns = $("#floatbtn> ul> li")

const start = 1
const end = $imgs.length - 2
let current = 1
let next = current + 1

let timer = autoSlide()

$(document).on("visibilitychange", (e) => {
    if (e.currentTarget.hidden) {
        window.clearInterval(timer)
    } else {
        timer = autoSlide()
    }
})

function autoSlide() {
    return setInterval(() => {
        if (next > 5) {
            next = 2
        }
        $btns[next - 2].click()
    }, 2000)
}

$("#container").on("mouseenter", () => {
    window.clearInterval(timer)
})

$("#container").on("mouseleave", () => {
    timer = autoSlide()
})

$btns.on("click", (e) => {
    let clickIdx = $(e.currentTarget).index()
    slideTo(clickIdx + 1)
    $(e.currentTarget).siblings().removeClass("special")
    $(e.currentTarget).addClass("special")
})

function slideTo(idx) {
    if (idx == start && current == end) {
        $imgs.css({
            "transform": `translateX(${-(current+1)*920}px)`
        }).one("transitionend", () => {
            $imgs.hide().offset()
            $imgs.css({
                "transform": "translateX(-920px)"
            }).show()
        })
    } else if (idx == end && current == start) {
        $imgs.css({
            "transform": "translateX(0)"
        }).one("transitionend", () => {
            $imgs.hide().offset()
            $imgs.css({
                "transform": `translateX(${-end*920}px)`
            }).show()
        })
    } else {
        $imgs.css({
            "transition": "all 1.5s",
            "transform": `translateX(${-(idx)*920}px)`
        })
    }
    current = idx
    next = current + 2
}