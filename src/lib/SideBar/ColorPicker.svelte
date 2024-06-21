<script>
    export let value;
    export let selected

    import { onMount } from "svelte";
    import Pickr from "@simonwep/pickr";
    import "@simonwep/pickr/dist/themes/monolith.min.css";

    import { ThemeStore } from "../Theme";
  
    let pickr;
  
    let theme;

    ThemeStore.subscribe((_value) => {
        theme = _value;
        if (pickr != null && pickr != undefined && pickr.getColor() != null && pickr.getColor().toHEXA() != theme[selected][value] && theme != undefined && theme[selected] != undefined && theme[selected][value] != undefined){
            console.log(theme[selected][value])
            pickr.setColor(theme[selected][value]);
        }
    });

    onMount(() => {
        pickr = Pickr.create({
            el: ".color-picker",
            theme: "monolith", // 'classic', 'monolith', 'nano'
            default: theme[selected][value],
      
            components: {
              preview: false,
              opacity: false,
              hue: true,
      
              interaction: {
                hex: false,
                rgba: false,
                hsla: false,
                input: true,
                save: false
              }
            }
        });
  
        pickr.on("change", (color, instance) => {
            const selectedColor = color.toHEXA().toString();

            pickr.setColor(selectedColor);

            ThemeStore.update((_value) => {
                _value[selected][value] = selectedColor;
                return _value;
            });
        });
    
        return () => {
            pickr.destroyAndRemove();
        };
    });
</script>
  
<div class="color-picker"></div>
  