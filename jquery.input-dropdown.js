;(function($) {
  $.fn.inputDropdown = function(arg1) {
    const methodArgs = Array.prototype.slice.call(arguments, 1)

    return this.each(function() {
      const instance = $(this).data('input-dropdown')

      if (instance && arg1 in instance && arg1.charAt(0) !== '_') {
        instance[arg1].apply(instance, methodArgs)
      } else if (typeof arg1 === 'object' || !arg1) {
        $(this).data('input-dropdown', new $.inputDropdown(this, arg1))
      } else {
        console.error('Does not exist on jQuery.inputDropdown.')
      }
    })
  }

  $.inputDropdown = function(targetElm, options) {
    this.elm = targetElm

    const settings = $.extend(
      {
        data: [],
        formatter: undefined,
        valueKey: 'data-value',
        maxHeight: '250px',
        color: '#252525',
        fontSize: '14px',
        background: '#eee'
      },
      options
    )
    this.settings = settings

    const targetId = targetElm.id
    const targetPosition = $(targetElm).offset()
    const style = `
      position: absolute;
      top: ${targetPosition.top + $(targetElm).height() + 7}px;
      left: ${targetPosition.left}px;
      overflow-y: scroll;
      max-height: ${settings.maxHeight};
      color: ${settings.color};
      font-size: ${settings.fontSize};
      background: ${settings.background};
    `
    const ulElm = `<ul id="jq-input-dropdown_${targetId}" class="jq-input-dropdown" style="${style}">`
    const listElm = settings.data.map(row => settings.formatter(row))
    $('body').append($(ulElm).append(listElm))

    const $inputDropdown = $(`#jq-input-dropdown_${targetId}`)

    $(targetElm).on('click', e => $inputDropdown.show())

    $inputDropdown.on('click', 'li', e => {
      $(targetElm).val($(e.target).attr(settings.valueKey))
      $inputDropdown.hide()
    })

    $(document).on('click', e => {
      if (!e.target.closest(`jq-input-dropdown_${targetId}`) && !e.target.closest('#' + targetId)) {
        $inputDropdown.hide()
      }
    })
  }

  $.extend($.inputDropdown.prototype, {
    update(data) {
      const $inputDropdown = $(`#jq-input-dropdown_${this.elm.id}`)
      this.settings.data = data
      $inputDropdown.children('li').remove()
      $inputDropdown.append(this.settings.data.map(row => this.settings.formatter(row)))
    }
  })
})(jQuery)
