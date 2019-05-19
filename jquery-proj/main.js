let buttons = $("#buttons > div")
let n = 0
let timer = slide(buttons.length)


let $oImages = $("#o-images > img")
let ucLocs = []
let locs = []

{
    for (var i = 0; i < $oImages.length; ++i) {
        locs.push(i * 300)
        ucLocs.push(i * 300)
    }
    slideSeamless()
}

{
    animation(0)

    $("#window").on("mouseenter", event => {
        window.clearInterval(timer)
    })
    $("#window").on("mouseleave", event => {
        timer = slide(buttons.length)
    })
}

function viewPicture($button) {
    $button.on("click", event => {
        let target = event.currentTarget
        animation($(target).index())
        window.clearInterval(timer)
    })
    $button.on("mouseleave", event => {
        timer = slide(buttons.length)
    })
}

function animation(n) {
    $("#images").css({
        "transform": "translateX(-" + n * 300 + "px)"
    })
    $("#buttons").children(".circle").eq(n).addClass("change-color").siblings(".change-color").removeClass("change-color")
}

function slide(size) {
    return setInterval(() => {
        animation(n % size)
        n += 1
    }, 1000)
}

function slideSeamless() {
    return setInterval(() => {
        for (let i = 0; i < $oImages.length; ++i) {
            locs[i] -= 300
            if (locs[i] < -300) {
                locs[i] = ($oImages.length-1)*300 + (-300)
                $($oImages[i]).removeAttr("style").css({
                    "transform": "translateX(" + (locs[i] - ucLocs[i]) + "px)"
                })
            } else {
                $($oImages[i]).removeAttr("style").css({
                    "transform": "translateX(" + (locs[i] - ucLocs[i]) + "px)",
                    "transition": "all 1s"
                })
            }
        }
    }, 3000)
}