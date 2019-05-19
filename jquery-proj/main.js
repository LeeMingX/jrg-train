let buttons = $("#buttons > div")
let n = 0
let timer = slide(buttons.length)


let $oImages = $("#o-images > img")
let ucLocs = []
let locs = []

let cn;

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

{
    reg_slide()
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
                locs[i] = ($oImages.length - 1) * 300 + (-300)
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

function reg_slide() {
    reg_slide_init()

    return setInterval(() => {
        fn = cn % 3 == 0 ? 3 : cn % 3;
        sn = (cn + 1) % 3 == 0 ? 3 : (cn + 1) % 3;
        reg_slide_node_leave(get_img_node(fn)).one("transitionend", (e) => {
            reg_slide_node_enter($(e.currentTarget));
        });
        reg_slide_node_current(get_img_node(sn))
        cn += 1;
    }, 1500);
}

function reg_slide_init() {
    cn = 1
    get_img_node(cn).addClass("current").siblings().addClass("enter")
    get_img_node(cn).removeAttr("style")
}

function reg_slide_node_enter($node) {
    return $node.removeClass("current leave").addClass("enter")
}

function reg_slide_node_current($node) {
    return $node.removeClass("enter leave").addClass("current")
}

function reg_slide_node_leave($node) {
    return $node.removeClass("current enter").addClass("leave")
}

function get_img_node(n) {
    return $(`#common-images> :nth-child(${n})`)
}