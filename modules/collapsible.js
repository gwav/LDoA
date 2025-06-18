/**
 * This function can be called to initialize all collapsible widgets within a
 * section of HTML. The container parameter defaults to the entire document if
 * not explicitly stated.
 */
export function initializeCollapsibles(container=document) {
    let widgets = container.querySelectorAll(".collapsible-widget");

    for(var i = 0; i < widgets.length; i++) {
        let widget   = widgets[i];
        let toggle   = widget.querySelector(".collapsible-widget-toggle");
        let target   = widget.querySelector(".collapsible-widget-target");
        let expanded = (widget.dataset.expanded === "true");
        let icons    = toggle.querySelectorAll(".collapsible-widget-icon");

        toggle.addEventListener("click", (e) => onCollapsibleToggleClicked(e, toggle, target));
        if(expanded) {
            icons[0].classList.add("ldoa-hidden");
            icons[1].classList.remove("ldoa-hidden");
            target.classList.remove("ldoa-hidden");
        } else {
            icons[0].classList.remove("ldoa-hidden");
            icons[1].classList.add("ldoa-hidden");
            target.classList.add("ldoa-hidden");
        }
    }
}

function onCollapsibleToggleClicked(event, toggle, container) {
    let icons = toggle.querySelectorAll(".collapsible-widget-icon");

    if(container.classList.contains("ldoa-hidden")) {
        container.classList.remove("ldoa-hidden");
        icons[0].classList.add("ldoa-hidden");
        icons[1].classList.remove("ldoa-hidden");
    } else {
        container.classList.add("ldoa-hidden");
        icons[0].classList.remove("ldoa-hidden");
        icons[1].classList.add("ldoa-hidden");
    }
}
