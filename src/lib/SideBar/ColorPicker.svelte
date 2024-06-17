<script>
    export let value;
    export let selected

    import { onMount } from "svelte";
    import Pickr from "@simonwep/pickr";
    import "@simonwep/pickr/dist/themes/monolith.min.css";

    import { theme } from "../Theme";
  
    let pickr;
  
    let themeValue;

    theme.subscribe((_value) => {
        themeValue = _value;
        if (pickr != undefined && pickr.getColor().toHEXA() != themeValue[selected][value]){
            pickr.setColor(themeValue[selected][value]);
        }
    });

    onMount(() => {
      pickr = Pickr.create({
        el: ".color-picker",
        theme: "monolith", // 'classic', 'monolith', 'nano'
        default: themeValue[selected][value],
  
        components: {
          preview: true,
          opacity: false,
          hue: true,
  
          interaction: {
            hex: true,
            rgba: false,
            hsla: false,
            input: true,
            save: true
          }
        }
      });
  
      pickr.on("save", (color, instance) => {
        const selectedColor = color.toHEXA().toString();

        theme.update((_value) => {
            _value[selected][value] = selectedColor;
            return _value;
        });

        console.log("Selected color:", selectedColor);
        pickr.hide();
      });
  
      return () => {
        pickr.destroyAndRemove();
      };
    });
  </script>
  
  <style>
    .color-picker {
      width: 200px;
      height: 50px;
      margin: 10px;
      border: 1px solid #ccc;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background: #ffffff;
      margin-right: 10px;
    }
  </style>
  
  <div class="color-picker"></div>
  