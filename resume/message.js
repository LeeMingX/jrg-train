! function () {
    let view = {
        view: null,
        init: function (id) {
            this.view = document.querySelector(id)
        },
        display: function (msgs) {
            msgs.forEach((msg, i) => {
                this.view.querySelector("#message-display").appendChild(
                    this.new_messge(
                        msg.attributes.author,
                        msg.attributes.comments
                    )
                )
            })
        },
        add_new_message: function (author, comment) {
            this.view.querySelector("#message-display").appendChild(this.new_messge(author, comment))
        },
        new_messge: function (author, comment) {
            let single_comment = document.createElement("li")
            single_comment.innerHTML = `
                <span class="author">
                    ${author}
                </span>
                say:
                <span class="comment">
                    ${comment}
                </span>`
            return single_comment
        }
    }

    let model = {
        init: function () {
            let APP_ID = 'Lbgd2D1D1EYdmlajdXdEMnvl-gzGzoHsz';
            let APP_KEY = 'B1xKYo74J1yjWm8kmxQR9AmT';

            AV.init({
                appId: APP_ID,
                appKey: APP_KEY
            })

            this.CommentObj = AV.Object.extend("CommentObject")
        },
        get_all_message: function () {
            let query = new AV.Query("CommentObject")
            return query.find()
        },
        save_a_message: function (author, comment) {
            let commentObj = new this.CommentObj()
            commentObj.save({
                "author": author,
                "comments": comment
            }).then(() => {
                document.querySelector("#message-display").appendChild(
                    generate_comment(author, comment)
                )
            }, () => {
                alert("评论失败")
            })
        }
    }

    let controller = {
        bind_event: function () {
            view.view.addEventListener("submit", (e) => {
                e.preventDefault()
                let author = document.querySelector("[name=author]").value
                let comment = document.querySelector("[name=comment]").value
                if (comment === "") {
                    alert("填写内容为空")
                } else {
                    model.save_a_message(author, comment)
                    view.add_new_message(author, comment)
                }
            })
        },
        show_all: function () {
            model.get_all_message().then((objs) => {
                view.display(objs)
            })
        }
    }

    view.init("#leaveMessage")
    model.init()
    controller.bind_event()
    controller.show_all()
}()