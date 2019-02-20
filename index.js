const { h, app } = window.hyperapp

// prettier-ignore
const targets = [
  "手","田","水","口","廿","卜","山","戈","人","心",
  "日","尸","木","火","土","竹","十","大","中",
            "金","女","月","弓","一",
]

const choose = a => a[Math.floor(Math.random() * a.length)]

// state

const state = {
  target: choose(targets),
  input: "",
}

// actions --------------------------------------------------------------------

const sanitise = s => {
  const m = s.match(/\p{L}+/u)
  return m ? m[0] : ""
}

const actions = {
  onKeydown: e => (state, actions) => {
    if (e.code === "Space") {
      // Give the input value a moment to settle.
      setTimeout(actions.afterSpace, 10)
    }
  },
  afterSpace: () => state => {
    const inputElement = document.getElementById("input")
    inputElement.value = sanitise(inputElement.value)
    if (inputElement.value === state.target) {
      return { target: choose(targets), input: "" }
    }
  },
}

// view -----------------------------------------------------------------------

const centred = element =>
  h(
    "div",
    { class: "outer" },
    h("div", { class: "middle" }, h("div", { class: "inner" }, element)),
  )

const view = (state, actions) =>
  centred(
    h(
      "div",
      {
        class: "main",
        oncreate: () => document.addEventListener("keydown", actions.onKeydown),
      },
      h("div", { id: "target" }, state.target),
      h(
        "input",
        {
          id: "input",
          autofocus: true,
          value: state.input,
        },
        "",
      ),
    ),
  )

// hyperapp -------------------------------------------------------------------

app(state, actions, view, document.body)
