<p>
    Let's talk about sub-table captions.  Sub-tables can have up to two pieces of data shown on top in their 
    <code>&lt;caption&gt;</code> element:  The sub-table's level, and a path that is meant to tell the user how we 
    got to the data in the sub-table by navigating the data's hierarchy.
</p>
<p>
    The order of the <code>level</code> and <code>path</code> is controlled by the <code>captionOrder</code> prop.
</p>
<h4>Level</h4>
<p>
    This is a very simple concept:  The level indicates how deep in the hierarchy a table is.  The main table is level 
    1; the immediate child tables are all level 2, etc.  You get the idea.  We enable <code>level</code> with the 
    <code>level</code> prop.
</p>
<h4>Path</h4>
<p>
    The path is meant to be a chain of values (called segments) that quickly tells users how to get to the data shown 
    in the sub-table.  This example defines the segments as the manager's last name.
</p>
<p>
    Two properties control the path:  <code>showPath</code> and <code>pathSegment</code>.  There's a third property 
    called <code>pathSeparator</code> that defines the text between path segments, and a fourth property called 
    <code>maxPathSegmentLength</code> to help shorten path segments so path doesn't grow too long too fast.
</p>
