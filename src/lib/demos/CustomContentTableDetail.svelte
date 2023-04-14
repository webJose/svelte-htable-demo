<p>
    The <code>Htable</code> component allows re-definition of its header and data cell content.  We have already seen 
    how we can use a column's <code>renderValue</code> function to format data or even create computed data, but most 
    often than not, we need more.  Things like hyperlinks, buttons and images are common requirements.
</p>
<p>
    You may include any HTML content inside headers or data cells by using the <code>headercell</code> and 
    <code>datacell</code> slots.
</p>
<p>
    This example adds the <strong>Weight</strong> computed column.  This column's header has been customized through 
    the <code>headercell</code> slot.  Furthermore, the <strong>Country Code</strong> column's data now features a 
    hyperlink to an external website that shows some information about this country's flag.
</p>
<p>
    <strong>NOTE:</strong>  The <strong>Weight</strong> column has a chance to contain empty values.  This is 
    intentional.  Historically, some browsers have had trouble showing correct cell styling when the cell is 
    completely empty.  Especifically, older browsers sometimes don't draw cell borders on empty cells.  This example 
    has added borders to all data cells.  If any empty cell also lacks a border, then compare with the 
    <strong>StdCell variant.</strong>
</p>
<p>
    <code>StdCell</code> is a tiny component that can be used as default cell content.  It exchanges empty strings 
    with a single non-breaking space (<code>&amp;nbsp;</code>).
</p>
