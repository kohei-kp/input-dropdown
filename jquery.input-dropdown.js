(function($) {
  $.fn.inputDropdown = function(data, options) {
    const settings = $.extend({
      formatter: undefined,
      valueKey: 'data-value',
      maxHeight: '250px'
    }, options)

    const targetId = this[0].id
    const targetPosition = this.position()
    const style = `
      position: absolute;
      top: ${targetPosition.top + this.height() + 7}px;
      left: ${targetPosition.left}px;
      overflow-y: scroll;
      height: ${settings.maxHeight}
    `
    const ulElm = `<ul id="jq-input-dropdown_${targetId}" class="jq-input-dropdown" style="${style}">`
    const listElm = data.map(row => settings.formatter(row))
    $('body').append($(ulElm).append(listElm))

    const $inputDropdown = $(`#jq-input-dropdown_${targetId}`)

    this.on('click', e => $inputDropdown.show())

    $inputDropdown.on('click', 'li', e => {
      this.val($(e.target).attr(settings.valueKey))
      $inputDropdown.hide()
    })

    $(document).on('click', e => {
      if (!(e.target).closest(`jq-input-dropdown_${targetId}`) && !(e.target).closest('#' + targetId)) {
        $inputDropdown.hide()
      }
    })
  }
})(jQuery)

