<p>
    This demo shows the same table shown in the <strong>Custom Content</strong> example minus the cell borders.
</p>
<p>
    You are probably thinking:  More than just the cell borders is missing, and you are correct.  It so happens that 
    the alternating row style has been lost as well.  This is one of the prices you pay by using the 
    <code>datarow</code> slot:  The <code>even</code> and <code>odd</code> CSS classes are gone.  But no worries, as 
    these can be calculated again.  It is just something you must have in mind.  Use the example controls to enable 
    the calculation of the CSS classes.
</p>
<p>
    Now, what's the deal about this row slot?  Simple:  We can control the row fully.  For example, the highlight 
    effect shown in this example is done by applying a CSS class at the row level.  Furthermore, matching rows 
    collapse the <strong>Birth Date</strong> and <strong>Age</strong> data cells together to show an age delta 
    alongside the birth date.  These two feats are not possible using the <code>datacell</code> slot.
</p>