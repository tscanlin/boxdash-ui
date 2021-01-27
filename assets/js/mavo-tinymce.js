(function($) {

    var parser, serializer;
    
    Mavo.Plugins.register("tinymce", {
        ready: $.include(self.tinymce, "https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.9.11/tinymce.min.js").then(() => {
            parser = new tinymce.html.DomParser();
            serializer = new tinymce.html.Serializer();
        })
    });
    
    Mavo.Elements.register(".tinymce", {
        hasChildren: true,
        default: true,
        edit: function() {
            (this.preEdit || Promise.resolve()).then(v => {
                if (v === "abort") {
                    return;
                }
    
                if (this.element.tinymce) {
                    // Previously edited, we already have an editor
                    tinymce.EditorManager.execCommand("mceAddEditor", true, this.element.tinymce.id);
                    return;
                }
    
                const toolbar = this.element.getAttribute("mv-tinymce-toolbar")
    
                // Init for the first time
                tinymce.init({
                    target: this.element,
                    inline: true,
                    menubar: false,
                    toolbar: toolbar || "styleselect | bold italic | image link | table | bullist numlist",
                    plugins: "image code link table lists media tabfocus"
                }).then(editors => {
                    this.element.tinymce = editors[0];
    
                    this.element.tinymce.on("change keyup paste cut", evt => {
                        this.value = this.getValue();
                    });
                });
            });
        },
        done: function() {
            if (this.element.tinymce) {
                tinymce.EditorManager.execCommand("mceRemoveEditor", true, this.element.tinymce.id);
            }
        },
        getValue: (element) => {
            return element.tinymce ? element.tinymce.getContent() : element.innerHTML;
        },
        setValue: (element, value) => {
            const content = serializer.serialize(parser.parse(value));
            
            console.log('@isHidden',  element.tinymce,element.tinymce && element.tinymce.isHidden())
            console.log('@notDirty',element.tinymce && element.tinymce.isNotDirty, element.tinymce && element.tinymce.isDirty())

            if (!element.tinymce) {
                console.log('hi')
                element.innerHTML = content;
            }
            // This second part is needed because sometimes they can be in a dirty state.
            else if (element.tinymce.isHidden() || (!element.tinymce.isHidden() && element.tinymce.isNotDirty)) {
                console.log('hi2')
                element.tinymce.setContent(content);
            } else {
                console.log('hi3')
            }
        }
    });
    
    })(Bliss);
    