<p>
	This example takes the <strong>Data Styling</strong> example and adds a <code>renderValue</code> function to the column definition of the <strong>Birth Date</strong> column.  If you pay close attention, those date values are ISO 8601 strings, but this new change converts them to a more human-friendly textual representation.
</p>
<p>
	There's also one other formatting-related change:  Note how there are some people without managers (manager ID in previous examples shows up as <code>(---)</code>).  Well, this meant the property value was <code>null</code>; not <code>undefined</code> but <code>null</code>.  This example changes this representation to <code>(null)</code> using the <code>nullText</code> prop of the <code>Htable</code> component.
</p>
<p>
	Finally, there's a new column called <strong>Age</strong>.  This piece of data doesn't come from the fetched data and instead it is computed, meaning <strong>Age</strong> is a <strong>computed column</strong>.  The computation is done inside the column definition's <code>renderValue</code> function.
</p>