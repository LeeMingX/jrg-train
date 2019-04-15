let buttons = $("#buttons > div")
let n = 0
let timer = slide(buttons.length)

{
    for (let i = 0; i < buttons.length; ++i) {
        viewPicture($(buttons[i]))
    }
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