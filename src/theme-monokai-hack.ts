const monokaiTheme2 = `/* Original style from softwaremaniacs.org (c) Ivan Sagalaev <Maniac@SoftwareManiacs.Org> */
.swagger-section pre code {
  display: block;
  padding: 0.5em;
  background: #F0F0F0;
}
.swagger-section pre code,
.swagger-section pre .subst,
.swagger-section pre .tag .title,
.swagger-section pre .lisp .title,
.swagger-section pre .clojure .built_in,
.swagger-section pre .nginx .title {
  color: black;
}
.swagger-section pre .string,
.swagger-section pre .title,
.swagger-section pre .constant,
.swagger-section pre .parent,
.swagger-section pre .tag .value,
.swagger-section pre .rules .value,
.swagger-section pre .rules .value .number,
.swagger-section pre .preprocessor,
.swagger-section pre .ruby .symbol,
.swagger-section pre .ruby .symbol .string,
.swagger-section pre .aggregate,
.swagger-section pre .template_tag,
.swagger-section pre .django .variable,
.swagger-section pre .smalltalk .class,
.swagger-section pre .addition,
.swagger-section pre .flow,
.swagger-section pre .stream,
.swagger-section pre .bash .variable,
.swagger-section pre .apache .tag,
.swagger-section pre .apache .cbracket,
.swagger-section pre .tex .command,
.swagger-section pre .tex .special,
.swagger-section pre .erlang_repl .function_or_atom,
.swagger-section pre .markdown .header {
  color: #800;
}
.swagger-section pre .comment,
.swagger-section pre .annotation,
.swagger-section pre .template_comment,
.swagger-section pre .diff .header,
.swagger-section pre .chunk,
.swagger-section pre .markdown .blockquote {
  color: #888;
}
.swagger-section pre .number,
.swagger-section pre .date,
.swagger-section pre .regexp,
.swagger-section pre .literal,
.swagger-section pre .smalltalk .symbol,
.swagger-section pre .smalltalk .char,
.swagger-section pre .go .constant,
.swagger-section pre .change,
.swagger-section pre .markdown .bullet,
.swagger-section pre .markdown .link_url {
  color: #080;
}
.swagger-section pre .label,
.swagger-section pre .javadoc,
.swagger-section pre .ruby .string,
.swagger-section pre .decorator,
.swagger-section pre .filter .argument,
.swagger-section pre .localvars,
.swagger-section pre .array,
.swagger-section pre .attr_selector,
.swagger-section pre .important,
.swagger-section pre .pseudo,
.swagger-section pre .pi,
.swagger-section pre .doctype,
.swagger-section pre .deletion,
.swagger-section pre .envvar,
.swagger-section pre .shebang,
.swagger-section pre .apache .sqbracket,
.swagger-section pre .nginx .built_in,
.swagger-section pre .tex .formula,
.swagger-section pre .erlang_repl .reserved,
.swagger-section pre .prompt,
.swagger-section pre .markdown .link_label,
.swagger-section pre .vhdl .attribute,
.swagger-section pre .clojure .attribute,
.swagger-section pre .coffeescript .property {
  color: #88F;
}
.swagger-section pre .keyword,
.swagger-section pre .id,
.swagger-section pre .phpdoc,
.swagger-section pre .title,
.swagger-section pre .built_in,
.swagger-section pre .aggregate,
.swagger-section pre .css .tag,
.swagger-section pre .javadoctag,
.swagger-section pre .phpdoc,
.swagger-section pre .yardoctag,
.swagger-section pre .smalltalk .class,
.swagger-section pre .winutils,
.swagger-section pre .bash .variable,
.swagger-section pre .apache .tag,
.swagger-section pre .go .typename,
.swagger-section pre .tex .command,
.swagger-section pre .markdown .strong,
.swagger-section pre .request,
.swagger-section pre .status {
  font-weight: bold;
}
.swagger-section pre .markdown .emphasis {
  font-style: italic;
}
.swagger-section pre .nginx .built_in {
  font-weight: normal;
}
.swagger-section pre .coffeescript .javascript,
.swagger-section pre .javascript .xml,
.swagger-section pre .tex .formula,
.swagger-section pre .xml .javascript,
.swagger-section pre .xml .vbscript,
.swagger-section pre .xml .css,
.swagger-section pre .xml .cdata {
  opacity: 0.5;
}
.swagger-section .hljs {
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  background: #F0F0F0;
}
.swagger-section .hljs,
.swagger-section .hljs-subst {
  color: #444;
}
.swagger-section .hljs-keyword,
.swagger-section .hljs-attribute,
.swagger-section .hljs-selector-tag,
.swagger-section .hljs-meta-keyword,
.swagger-section .hljs-doctag,
.swagger-section .hljs-name {
  font-weight: bold;
}
.swagger-section .hljs-built_in,
.swagger-section .hljs-literal,
.swagger-section .hljs-bullet,
.swagger-section .hljs-code,
.swagger-section .hljs-addition {
  color: #1F811F;
}
.swagger-section .hljs-regexp,
.swagger-section .hljs-symbol,
.swagger-section .hljs-variable,
.swagger-section .hljs-template-variable,
.swagger-section .hljs-link,
.swagger-section .hljs-selector-attr,
.swagger-section .hljs-selector-pseudo {
  color: #BC6060;
}
.swagger-section .hljs-type,
.swagger-section .hljs-string,
.swagger-section .hljs-number,
.swagger-section .hljs-selector-id,
.swagger-section .hljs-selector-class,
.swagger-section .hljs-quote,
.swagger-section .hljs-template-tag,
.swagger-section .hljs-deletion {
  color: #880000;
}
.swagger-section .hljs-title,
.swagger-section .hljs-section {
  color: #880000;
  font-weight: bold;
}
.swagger-section .hljs-comment {
  color: #888888;
}
.swagger-section .hljs-meta {
  color: #2B6EA1;
}
.swagger-section .hljs-emphasis {
  font-style: italic;
}
.swagger-section .hljs-strong {
  font-weight: bold;
}
.swagger-section .swagger-ui-wrap {
  line-height: 1;
  font-family: "Droid Sans", sans-serif;
  min-width: 760px;
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
  /* JSONEditor specific styling */
}
.swagger-section .swagger-ui-wrap b,
.swagger-section .swagger-ui-wrap strong {
  font-family: "Droid Sans", sans-serif;
  font-weight: bold;
}
.swagger-section .swagger-ui-wrap q,
.swagger-section .swagger-ui-wrap blockquote {
  quotes: none;
}
.swagger-section .swagger-ui-wrap p {
  line-height: 1.4em;
  padding: 0 0 10px;
  color: #333333;
}
.swagger-section .swagger-ui-wrap q:before,
.swagger-section .swagger-ui-wrap q:after,
.swagger-section .swagger-ui-wrap blockquote:before,
.swagger-section .swagger-ui-wrap blockquote:after {
  content: none;
}
.swagger-section .swagger-ui-wrap .heading_with_menu h1,
.swagger-section .swagger-ui-wrap .heading_with_menu h2,
.swagger-section .swagger-ui-wrap .heading_with_menu h3,
.swagger-section .swagger-ui-wrap .heading_with_menu h4,
.swagger-section .swagger-ui-wrap .heading_with_menu h5,
.swagger-section .swagger-ui-wrap .heading_with_menu h6 {
  display: block;
  clear: none;
  float: left;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -ms-box-sizing: border-box;
  box-sizing: border-box;
  width: 60%;
}
.swagger-section .swagger-ui-wrap table {
  border-collapse: collapse;
  border-spacing: 0;
}
.swagger-section .swagger-ui-wrap table thead tr th {
  padding: 5px;
  font-size: 0.9em;
  color: #666666;
  border-bottom: 1px solid #999999;
}
.swagger-section .swagger-ui-wrap table tbody tr:last-child td {
  border-bottom: none;
}
.swagger-section .swagger-ui-wrap table tbody tr.offset {
  background-color: #f0f0f0;
}
.swagger-section .swagger-ui-wrap table tbody tr td {
  padding: 6px;
  font-size: 0.9em;
  border-bottom: 1px solid #cccccc;
  vertical-align: top;
  line-height: 1.3em;
}
.swagger-section .swagger-ui-wrap ol {
  margin: 0px 0 10px;
  padding: 0 0 0 18px;
  list-style-type: decimal;
}
.swagger-section .swagger-ui-wrap ol li {
  padding: 5px 0px;
  font-size: 0.9em;
  color: #333333;
}
.swagger-section .swagger-ui-wrap ol,
.swagger-section .swagger-ui-wrap ul {
  list-style: none;
}
.swagger-section .swagger-ui-wrap h1 a,
.swagger-section .swagger-ui-wrap h2 a,
.swagger-section .swagger-ui-wrap h3 a,
.swagger-section .swagger-ui-wrap h4 a,
.swagger-section .swagger-ui-wrap h5 a,
.swagger-section .swagger-ui-wrap h6 a {
  text-decoration: none;
}
.swagger-section .swagger-ui-wrap h1 a:hover,
.swagger-section .swagger-ui-wrap h2 a:hover,
.swagger-section .swagger-ui-wrap h3 a:hover,
.swagger-section .swagger-ui-wrap h4 a:hover,
.swagger-section .swagger-ui-wrap h5 a:hover,
.swagger-section .swagger-ui-wrap h6 a:hover {
  text-decoration: underline;
}
.swagger-section .swagger-ui-wrap h1 span.divider,
.swagger-section .swagger-ui-wrap h2 span.divider,
.swagger-section .swagger-ui-wrap h3 span.divider,
.swagger-section .swagger-ui-wrap h4 span.divider,
.swagger-section .swagger-ui-wrap h5 span.divider,
.swagger-section .swagger-ui-wrap h6 span.divider {
  color: #aaaaaa;
}
.swagger-section .swagger-ui-wrap a {
  color: #547f00;
}
.swagger-section .swagger-ui-wrap a img {
  border: none;
}
.swagger-section .swagger-ui-wrap article,
.swagger-section .swagger-ui-wrap aside,
.swagger-section .swagger-ui-wrap details,
.swagger-section .swagger-ui-wrap figcaption,
.swagger-section .swagger-ui-wrap figure,
.swagger-section .swagger-ui-wrap footer,
.swagger-section .swagger-ui-wrap header,
.swagger-section .swagger-ui-wrap hgroup,
.swagger-section .swagger-ui-wrap menu,
.swagger-section .swagger-ui-wrap nav,
.swagger-section .swagger-ui-wrap section,
.swagger-section .swagger-ui-wrap summary {
  display: block;
}
.swagger-section .swagger-ui-wrap pre {
  font-family: "Anonymous Pro", "Menlo", "Consolas", "Bitstream Vera Sans Mono", "Courier New", monospace;
  background-color: #fcf6db;
  border: 1px solid #e5e0c6;
  padding: 10px;
}
.swagger-section .swagger-ui-wrap pre code {
  line-height: 1.6em;
  background: none;
}
.swagger-section .swagger-ui-wrap .content > .content-type > div > label {
  clear: both;
  display: block;
  color: #0F6AB4;
  font-size: 1.1em;
  margin: 0;
  padding: 15px 0 5px;
}
.swagger-section .swagger-ui-wrap .content pre {
  font-size: 12px;
  margin-top: 5px;
  padding: 5px;
}
.swagger-section .swagger-ui-wrap .icon-btn {
  cursor: pointer;
}
.swagger-section .swagger-ui-wrap .info_title {
  padding-bottom: 10px;
  font-weight: bold;
  font-size: 25px;
}
.swagger-section .swagger-ui-wrap .footer {
  margin-top: 20px;
}
.swagger-section .swagger-ui-wrap p.big,
.swagger-section .swagger-ui-wrap div.big p {
  font-size: 1em;
  margin-bottom: 10px;
}
.swagger-section .swagger-ui-wrap form.fullwidth ol li.string input,
.swagger-section .swagger-ui-wrap form.fullwidth ol li.url input,
.swagger-section .swagger-ui-wrap form.fullwidth ol li.text textarea,
.swagger-section .swagger-ui-wrap form.fullwidth ol li.numeric input {
  width: 500px !important;
}
.swagger-section .swagger-ui-wrap .info_license {
  padding-bottom: 5px;
}
.swagger-section .swagger-ui-wrap .info_tos {
  padding-bottom: 5px;
}
.swagger-section .swagger-ui-wrap .message-fail {
  color: #cc0000;
}
.swagger-section .swagger-ui-wrap .info_url {
  padding-bottom: 5px;
}
.swagger-section .swagger-ui-wrap .info_email {
  padding-bottom: 5px;
}
.swagger-section .swagger-ui-wrap .info_name {
  padding-bottom: 5px;
}
.swagger-section .swagger-ui-wrap .info_description {
  padding-bottom: 10px;
  font-size: 15px;
}
.swagger-section .swagger-ui-wrap .markdown ol li,
.swagger-section .swagger-ui-wrap .markdown ul li {
  padding: 3px 0px;
  line-height: 1.4em;
  color: #333333;
}
.swagger-section .swagger-ui-wrap form.formtastic fieldset.inputs ol li.string input,
.swagger-section .swagger-ui-wrap form.formtastic fieldset.inputs ol li.url input,
.swagger-section .swagger-ui-wrap form.formtastic fieldset.inputs ol li.numeric input {
  display: block;
  padding: 4px;
  width: auto;
  clear: both;
}
.swagger-section .swagger-ui-wrap form.formtastic fieldset.inputs ol li.string input.title,
.swagger-section .swagger-ui-wrap form.formtastic fieldset.inputs ol li.url input.title,
.swagger-section .swagger-ui-wrap form.formtastic fieldset.inputs ol li.numeric input.title {
  font-size: 1.3em;
}
.swagger-section .swagger-ui-wrap table.fullwidth {
  width: 100%;
}
.swagger-section .swagger-ui-wrap .model-signature {
  font-family: "Droid Sans", sans-serif;
  font-size: 1em;
  line-height: 1.5em;
}
.swagger-section .swagger-ui-wrap .model-signature .signature-nav a {
  text-decoration: none;
  color: #AAA;
}
.swagger-section .swagger-ui-wrap .model-signature .signature-nav a:hover {
  text-decoration: underline;
  color: black;
}
.swagger-section .swagger-ui-wrap .model-signature .signature-nav .selected {
  color: black;
  text-decoration: none;
}
.swagger-section .swagger-ui-wrap .model-signature .propType {
  color: #5555aa;
}
.swagger-section .swagger-ui-wrap .model-signature pre:hover {
  background-color: #ffffdd;
}
.swagger-section .swagger-ui-wrap .model-signature pre {
  font-size: .85em;
  line-height: 1.2em;
  overflow: auto;
  max-height: 200px;
  cursor: pointer;
}
.swagger-section .swagger-ui-wrap .model-signature ul.signature-nav {
  display: block;
  min-width: 230px;
  margin: 0;
  padding: 0;
}
.swagger-section .swagger-ui-wrap .model-signature ul.signature-nav li:last-child {
  padding-right: 0;
  border-right: none;
}
.swagger-section .swagger-ui-wrap .model-signature ul.signature-nav li {
  float: left;
  margin: 0 5px 5px 0;
  padding: 2px 5px 2px 0;
  border-right: 1px solid #ddd;
}
.swagger-section .swagger-ui-wrap .model-signature .propOpt {
  color: #555;
}
.swagger-section .swagger-ui-wrap .model-signature .snippet small {
  font-size: 0.75em;
}
.swagger-section .swagger-ui-wrap .model-signature .propOptKey {
  font-style: italic;
}
.swagger-section .swagger-ui-wrap .model-signature .description .strong {
  font-weight: bold;
  color: #000;
  font-size: .9em;
}
.swagger-section .swagger-ui-wrap .model-signature .description div {
  font-size: 0.9em;
  line-height: 1.5em;
  margin-left: 1em;
}
.swagger-section .swagger-ui-wrap .model-signature .description .stronger {
  font-weight: bold;
  color: #000;
}
.swagger-section .swagger-ui-wrap .model-signature .description .propWrap .optionsWrapper {
  border-spacing: 0;
  position: absolute;
  background-color: #ffffff;
  border: 1px solid #bbbbbb;
  display: none;
  font-size: 11px;
  max-width: 400px;
  line-height: 30px;
  color: black;
  padding: 5px;
  margin-left: 10px;
}
.swagger-section .swagger-ui-wrap .model-signature .description .propWrap .optionsWrapper th {
  text-align: center;
  background-color: #eeeeee;
  border: 1px solid #bbbbbb;
  font-size: 11px;
  color: #666666;
  font-weight: bold;
  padding: 5px;
  line-height: 15px;
}
.swagger-section .swagger-ui-wrap .model-signature .description .propWrap .optionsWrapper .optionName {
  font-weight: bold;
}
.swagger-section .swagger-ui-wrap .model-signature .description .propDesc.markdown > p:first-child,
.swagger-section .swagger-ui-wrap .model-signature .description .propDesc.markdown > p:last-child {
  display: inline;
}
.swagger-section .swagger-ui-wrap .model-signature .description .propDesc.markdown > p:not(:first-child):before {
  display: block;
  content: '';
}
.swagger-section .swagger-ui-wrap .model-signature .description span:last-of-type.propDesc.markdown > p:only-child {
  margin-right: -3px;
}
.swagger-section .swagger-ui-wrap .model-signature .propName {
  font-weight: bold;
}
.swagger-section .swagger-ui-wrap .model-signature .signature-container {
  clear: both;
}
.swagger-section .swagger-ui-wrap .body-textarea {
  width: 300px;
  height: 100px;
  border: 1px solid #aaa;
}
.swagger-section .swagger-ui-wrap .markdown p code,
.swagger-section .swagger-ui-wrap .markdown li code {
  font-family: "Anonymous Pro", "Menlo", "Consolas", "Bitstream Vera Sans Mono", "Courier New", monospace;
  background-color: #f0f0f0;
  color: black;
  padding: 1px 3px;
}
.swagger-section .swagger-ui-wrap .required {
  font-weight: bold;
}
.swagger-section .swagger-ui-wrap .editor_holder {
  font-family: "Anonymous Pro", "Menlo", "Consolas", "Bitstream Vera Sans Mono", "Courier New", monospace;
  font-size: 0.9em;
}
.swagger-section .swagger-ui-wrap .editor_holder label {
  font-weight: normal!important;
  /* JSONEditor uses bold by default for all labels, we revert that back to normal to not give the impression that by default fields are required */
}
.swagger-section .swagger-ui-wrap .editor_holder label.required {
  font-weight: bold!important;
}
.swagger-section .swagger-ui-wrap input.parameter {
  width: 300px;
  border: 1px solid #aaa;
}
.swagger-section .swagger-ui-wrap h1 {
  color: black;
  font-size: 1.5em;
  line-height: 1.3em;
  padding: 10px 0 10px 0;
  font-family: "Droid Sans", sans-serif;
  font-weight: bold;
}
.swagger-section .swagger-ui-wrap .heading_with_menu {
  float: none;
  clear: both;
  overflow: hidden;
  display: block;
}
.swagger-section .swagger-ui-wrap .heading_with_menu ul {
  display: block;
  clear: none;
  float: right;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -ms-box-sizing: border-box;
  box-sizing: border-box;
  margin-top: 10px;
}
.swagger-section .swagger-ui-wrap h2 {
  color: black;
  font-size: 1.3em;
  padding: 10px 0 10px 0;
}
.swagger-section .swagger-ui-wrap h2 a {
  color: black;
}
.swagger-section .swagger-ui-wrap h2 span.sub {
  font-size: 0.7em;
  color: #999999;
  font-style: italic;
}
.swagger-section .swagger-ui-wrap h2 span.sub a {
  color: #777777;
}
.swagger-section .swagger-ui-wrap span.weak {
  color: #666666;
}
.swagger-section .swagger-ui-wrap .message-success {
  color: #89BF04;
}
.swagger-section .swagger-ui-wrap caption,
.swagger-section .swagger-ui-wrap th,
.swagger-section .swagger-ui-wrap td {
  text-align: left;
  font-weight: normal;
  vertical-align: middle;
}
.swagger-section .swagger-ui-wrap .code {
  font-family: "Anonymous Pro", "Menlo", "Consolas", "Bitstream Vera Sans Mono", "Courier New", monospace;
}
.swagger-section .swagger-ui-wrap form.formtastic fieldset.inputs ol li.text textarea {
  font-family: "Droid Sans", sans-serif;
  height: 250px;
  padding: 4px;
  display: block;
  clear: both;
}
.swagger-section .swagger-ui-wrap form.formtastic fieldset.inputs ol li.select select {
  display: block;
  clear: both;
}
.swagger-section .swagger-ui-wrap form.formtastic fieldset.inputs ol li.boolean {
  float: none;
  clear: both;
  overflow: hidden;
  display: block;
}
.swagger-section .swagger-ui-wrap form.formtastic fieldset.inputs ol li.boolean label {
  display: block;
  float: left;
  clear: none;
  margin: 0;
  padding: 0;
}
.swagger-section .swagger-ui-wrap form.formtastic fieldset.inputs ol li.boolean input {
  display: block;
  float: left;
  clear: none;
  margin: 0 5px 0 0;
}
.swagger-section .swagger-ui-wrap form.formtastic fieldset.inputs ol li.required label {
  color: black;
}
.swagger-section .swagger-ui-wrap form.formtastic fieldset.inputs ol li label {
  display: block;
  clear: both;
  width: auto;
  padding: 0 0 3px;
  color: #666666;
}
.swagger-section .swagger-ui-wrap form.formtastic fieldset.inputs ol li label abbr {
  padding-left: 3px;
  color: #888888;
}
.swagger-section .swagger-ui-wrap form.formtastic fieldset.inputs ol li p.inline-hints {
  margin-left: 0;
  font-style: italic;
  font-size: 0.9em;
  margin: 0;
}
.swagger-section .swagger-ui-wrap form.formtastic fieldset.buttons {
  margin: 0;
  padding: 0;
}
.swagger-section .swagger-ui-wrap span.blank,
.swagger-section .swagger-ui-wrap span.empty {
  color: #888888;
  font-style: italic;
}
.swagger-section .swagger-ui-wrap .markdown h3 {
  color: #547f00;
}
.swagger-section .swagger-ui-wrap .markdown h4 {
  color: #666666;
}
.swagger-section .swagger-ui-wrap .markdown pre {
  font-family: "Anonymous Pro", "Menlo", "Consolas", "Bitstream Vera Sans Mono", "Courier New", monospace;
  background-color: #fcf6db;
  border: 1px solid #e5e0c6;
  padding: 10px;
  margin: 0 0 10px 0;
}
.swagger-section .swagger-ui-wrap .markdown pre code {
  line-height: 1.6em;
  overflow: auto;
}
.swagger-section .swagger-ui-wrap div.gist {
  margin: 20px 0 25px 0 !important;
}
.swagger-section .swagger-ui-wrap ul#resources {
  font-family: "Droid Sans", sans-serif;
  font-size: 0.9em;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource {
  border-bottom: 1px solid #dddddd;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource:hover div.heading h2 a,
.swagger-section .swagger-ui-wrap ul#resources li.resource.active div.heading h2 a {
  color: black;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource:hover div.heading ul.options li a,
.swagger-section .swagger-ui-wrap ul#resources li.resource.active div.heading ul.options li a {
  color: #555555;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource:last-child {
  border-bottom: none;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource div.heading {
  border: 1px solid transparent;
  float: none;
  clear: both;
  overflow: hidden;
  display: block;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource div.heading ul.options {
  overflow: hidden;
  padding: 0;
  display: block;
  clear: none;
  float: right;
  margin: 14px 10px 0 0;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource div.heading ul.options li {
  float: left;
  clear: none;
  margin: 0;
  padding: 2px 10px;
  border-right: 1px solid #dddddd;
  color: #666666;
  font-size: 0.9em;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource div.heading ul.options li a {
  color: #aaaaaa;
  text-decoration: none;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource div.heading ul.options li a:hover {
  text-decoration: underline;
  color: black;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource div.heading ul.options li a:hover,
.swagger-section .swagger-ui-wrap ul#resources li.resource div.heading ul.options li a:active,
.swagger-section .swagger-ui-wrap ul#resources li.resource div.heading ul.options li a.active {
  text-decoration: underline;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource div.heading ul.options li:first-child,
.swagger-section .swagger-ui-wrap ul#resources li.resource div.heading ul.options li.first {
  padding-left: 0;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource div.heading ul.options li:last-child,
.swagger-section .swagger-ui-wrap ul#resources li.resource div.heading ul.options li.last {
  padding-right: 0;
  border-right: none;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource div.heading ul.options:first-child,
.swagger-section .swagger-ui-wrap ul#resources li.resource div.heading ul.options.first {
  padding-left: 0;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource div.heading h2 {
  color: #999999;
  padding-left: 0;
  display: block;
  clear: none;
  float: left;
  font-family: "Droid Sans", sans-serif;
  font-weight: bold;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource div.heading h2 a {
  color: #999999;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource div.heading h2 a:hover {
  color: black;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation {
  float: none;
  clear: both;
  overflow: hidden;
  display: block;
  margin: 0 0 10px;
  padding: 0;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation div.heading {
  float: none;
  clear: both;
  overflow: hidden;
  display: block;
  margin: 0;
  padding: 0;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation div.heading h3 {
  display: block;
  clear: none;
  float: left;
  width: auto;
  margin: 0;
  padding: 0;
  line-height: 1.1em;
  color: black;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation div.heading h3 span.path {
  padding-left: 10px;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation div.heading h3 span.path a {
  color: black;
  text-decoration: none;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation div.heading h3 span.path a.toggleOperation.deprecated {
  text-decoration: line-through;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation div.heading h3 span.path a:hover {
  text-decoration: underline;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation div.heading h3 span.http_method a {
  text-transform: uppercase;
  text-decoration: none;
  color: white;
  display: inline-block;
  width: 50px;
  font-size: 0.7em;
  text-align: center;
  padding: 7px 0 4px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  -o-border-radius: 2px;
  -ms-border-radius: 2px;
  -khtml-border-radius: 2px;
  border-radius: 2px;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation div.heading h3 span {
  margin: 0;
  padding: 0;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation div.heading ul.options {
  overflow: hidden;
  padding: 0;
  display: block;
  clear: none;
  float: right;
  margin: 6px 10px 0 0;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation div.heading ul.options li {
  float: left;
  clear: none;
  margin: 0;
  padding: 2px 10px;
  font-size: 0.9em;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation div.heading ul.options li a {
  text-decoration: none;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation div.heading ul.options li a .markdown p {
  color: inherit;
  padding: 0;
  line-height: inherit;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation div.heading ul.options li.access {
  color: black;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation div.content {
  border-top: none;
  padding: 10px;
  -moz-border-radius-bottomleft: 6px;
  -webkit-border-bottom-left-radius: 6px;
  -o-border-bottom-left-radius: 6px;
  -ms-border-bottom-left-radius: 6px;
  -khtml-border-bottom-left-radius: 6px;
  border-bottom-left-radius: 6px;
  -moz-border-radius-bottomright: 6px;
  -webkit-border-bottom-right-radius: 6px;
  -o-border-bottom-right-radius: 6px;
  -ms-border-bottom-right-radius: 6px;
  -khtml-border-bottom-right-radius: 6px;
  border-bottom-right-radius: 6px;
  margin: 0 0 20px;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation div.content h4 {
  font-size: 1.1em;
  margin: 0;
  padding: 15px 0 5px;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation div.content div.sandbox_header {
  float: none;
  clear: both;
  overflow: hidden;
  display: block;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation div.content div.sandbox_header a {
  padding: 4px 0 0 10px;
  display: inline-block;
  font-size: 0.9em;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation div.content div.sandbox_header input.submit {
  display: block;
  clear: none;
  float: left;
  padding: 6px 8px;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation div.content div.sandbox_header span.response_throbber {
  background-image: url('../images/throbber.gif');
  width: 128px;
  height: 16px;
  display: block;
  clear: none;
  float: right;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation div.content form input[type='text'].error {
  outline: 2px solid black;
  outline-color: #cc0000;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation div.content form select[name='parameterContentType'] {
  max-width: 300px;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation div.content div.response div.block pre {
  font-family: "Anonymous Pro", "Menlo", "Consolas", "Bitstream Vera Sans Mono", "Courier New", monospace;
  padding: 10px;
  font-size: 0.9em;
  max-height: 400px;
  overflow-y: auto;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.put div.heading {
  background-color: #f9f2e9;
  border: 1px solid #f0e0ca;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.put div.heading h3 span.http_method a {
  background-color: #c5862b;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.put div.heading ul.options li {
  border-right: 1px solid #dddddd;
  border-right-color: #f0e0ca;
  color: #c5862b;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.put div.heading ul.options li a {
  color: #c5862b;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.put div.content {
  background-color: #faf5ee;
  border: 1px solid #f0e0ca;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.put div.content h4 {
  color: #c5862b;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.put div.content div.sandbox_header a {
  color: #dcb67f;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.head div.heading {
  background-color: #fcffcd;
  border: 1px solid black;
  border-color: #ffd20f;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.head div.heading h3 span.http_method a {
  text-transform: uppercase;
  background-color: #ffd20f;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.head div.heading ul.options li {
  border-right: 1px solid #dddddd;
  border-right-color: #ffd20f;
  color: #ffd20f;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.head div.heading ul.options li a {
  color: #ffd20f;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.head div.content {
  background-color: #fcffcd;
  border: 1px solid black;
  border-color: #ffd20f;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.head div.content h4 {
  color: #ffd20f;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.head div.content div.sandbox_header a {
  color: #6fc992;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.delete div.heading {
  background-color: #f5e8e8;
  border: 1px solid #e8c6c7;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.delete div.heading h3 span.http_method a {
  text-transform: uppercase;
  background-color: #a41e22;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.delete div.heading ul.options li {
  border-right: 1px solid #dddddd;
  border-right-color: #e8c6c7;
  color: #a41e22;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.delete div.heading ul.options li a {
  color: #a41e22;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.delete div.content {
  background-color: #f7eded;
  border: 1px solid #e8c6c7;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.delete div.content h4 {
  color: #a41e22;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.delete div.content div.sandbox_header a {
  color: #c8787a;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.post div.heading {
  background-color: #e7f6ec;
  border: 1px solid #c3e8d1;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.post div.heading h3 span.http_method a {
  background-color: #10a54a;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.post div.heading ul.options li {
  border-right: 1px solid #dddddd;
  border-right-color: #c3e8d1;
  color: #10a54a;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.post div.heading ul.options li a {
  color: #10a54a;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.post div.content {
  background-color: #ebf7f0;
  border: 1px solid #c3e8d1;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.post div.content h4 {
  color: #10a54a;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.post div.content div.sandbox_header a {
  color: #6fc992;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.patch div.heading {
  background-color: #FCE9E3;
  border: 1px solid #F5D5C3;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.patch div.heading h3 span.http_method a {
  background-color: #D38042;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.patch div.heading ul.options li {
  border-right: 1px solid #dddddd;
  border-right-color: #f0cecb;
  color: #D38042;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.patch div.heading ul.options li a {
  color: #D38042;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.patch div.content {
  background-color: #faf0ef;
  border: 1px solid #f0cecb;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.patch div.content h4 {
  color: #D38042;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.patch div.content div.sandbox_header a {
  color: #dcb67f;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.get div.heading {
  background-color: #e7f0f7;
  border: 1px solid #c3d9ec;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.get div.heading h3 span.http_method a {
  background-color: #0f6ab4;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.get div.heading ul.options li {
  border-right: 1px solid #dddddd;
  border-right-color: #c3d9ec;
  color: #0f6ab4;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.get div.heading ul.options li a {
  color: #0f6ab4;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.get div.content {
  background-color: #ebf3f9;
  border: 1px solid #c3d9ec;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.get div.content h4 {
  color: #0f6ab4;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.get div.content div.sandbox_header a {
  color: #6fa5d2;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.options div.heading {
  background-color: #e7f0f7;
  border: 1px solid #c3d9ec;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.options div.heading h3 span.http_method a {
  background-color: #0f6ab4;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.options div.heading ul.options li {
  border-right: 1px solid #dddddd;
  border-right-color: #c3d9ec;
  color: #0f6ab4;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.options div.heading ul.options li a {
  color: #0f6ab4;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.options div.content {
  background-color: #ebf3f9;
  border: 1px solid #c3d9ec;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.options div.content h4 {
  color: #0f6ab4;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.options div.content div.sandbox_header a {
  color: #6fa5d2;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.get div.content,
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.post div.content,
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.head div.content,
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.put div.content,
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.patch div.content,
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.delete div.content {
  border-top: none;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.get div.heading ul.options li:last-child,
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.post div.heading ul.options li:last-child,
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.head div.heading ul.options li:last-child,
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.put div.heading ul.options li:last-child,
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.patch div.heading ul.options li:last-child,
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.delete div.heading ul.options li:last-child,
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.get div.heading ul.options li.last,
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.post div.heading ul.options li.last,
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.head div.heading ul.options li.last,
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.put div.heading ul.options li.last,
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.patch div.heading ul.options li.last,
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.delete div.heading ul.options li.last {
  padding-right: 0;
  border-right: none;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations ul.options li a:hover,
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations ul.options li a:active,
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations ul.options li a.active {
  text-decoration: underline;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations ul.options li:first-child,
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations ul.options li.first {
  padding-left: 0;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations:first-child,
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations.first {
  padding-left: 0;
}
.swagger-section .swagger-ui-wrap p#colophon {
  margin: 0 15px 40px 15px;
  padding: 10px 0;
  font-size: 0.8em;
  border-top: 1px solid #dddddd;
  font-family: "Droid Sans", sans-serif;
  color: #999999;
  font-style: italic;
}
.swagger-section .swagger-ui-wrap p#colophon a {
  text-decoration: none;
  color: #547f00;
}
.swagger-section .swagger-ui-wrap h3 {
  color: black;
  font-size: 1.1em;
  padding: 10px 0 10px 0;
}
.swagger-section .swagger-ui-wrap .markdown ol,
.swagger-section .swagger-ui-wrap .markdown ul {
  font-family: "Droid Sans", sans-serif;
  margin: 5px 0 10px;
  padding: 0 0 0 18px;
  list-style-type: disc;
}
.swagger-section .swagger-ui-wrap form.form_box {
  background-color: #ebf3f9;
  border: 1px solid #c3d9ec;
  padding: 10px;
}
.swagger-section .swagger-ui-wrap form.form_box label {
  color: #0f6ab4 !important;
}
.swagger-section .swagger-ui-wrap form.form_box input[type=submit] {
  display: block;
  padding: 10px;
}
.swagger-section .swagger-ui-wrap form.form_box p.weak {
  font-size: 0.8em;
}
.swagger-section .swagger-ui-wrap form.form_box p {
  font-size: 0.9em;
  padding: 0 0 15px;
  color: #7e7b6d;
}
.swagger-section .swagger-ui-wrap form.form_box p a {
  color: #646257;
}
.swagger-section .swagger-ui-wrap form.form_box p strong {
  color: black;
}
.swagger-section .swagger-ui-wrap .operation-status td.markdown > p:last-child {
  padding-bottom: 0;
}
.swagger-section .title {
  font-style: bold;
}
.swagger-section .secondary_form {
  display: none;
}
.swagger-section .main_image {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.swagger-section .oauth_body {
  margin-left: 100px;
  margin-right: 100px;
}
.swagger-section .oauth_submit {
  text-align: center;
  display: inline-block;
}
.swagger-section .authorize-wrapper {
  margin: 15px 0 10px;
}
.swagger-section .authorize-wrapper_operation {
  float: right;
}
.swagger-section .authorize__btn:hover {
  text-decoration: underline;
  cursor: pointer;
}
.swagger-section .authorize__btn_operation:hover .authorize-scopes {
  display: block;
}
.swagger-section .authorize-scopes {
  position: absolute;
  margin-top: 20px;
  background: #FFF;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: none;
  font-size: 13px;
  max-width: 300px;
  line-height: 30px;
  color: black;
  padding: 5px;
}
.swagger-section .authorize-scopes .authorize__scope {
  text-decoration: none;
}
.swagger-section .authorize__btn_operation {
  height: 18px;
  vertical-align: middle;
  display: inline-block;
  background: url(../images/explorer_icons.png) no-repeat;
}
.swagger-section .authorize__btn_operation_login {
  background-position: 0 0;
  width: 18px;
  margin-top: -6px;
  margin-left: 4px;
}
.swagger-section .authorize__btn_operation_logout {
  background-position: -30px 0;
  width: 18px;
  margin-top: -6px;
  margin-left: 4px;
}
.swagger-section #auth_container {
  color: #fff;
  display: inline-block;
  border: none;
  padding: 5px;
  width: 87px;
  height: 13px;
}
.swagger-section #auth_container .authorize__btn {
  color: #fff;
}
.swagger-section .auth_container {
  padding: 0 0 10px;
  margin-bottom: 5px;
  border-bottom: solid 1px #CCC;
  font-size: 0.9em;
}
.swagger-section .auth_container .auth__title {
  color: #547f00;
  font-size: 1.2em;
}
.swagger-section .auth_container .basic_auth__label {
  display: inline-block;
  width: 60px;
}
.swagger-section .auth_container .auth__description {
  color: #999999;
  margin-bottom: 5px;
}
.swagger-section .auth_container .auth__button {
  margin-top: 10px;
  height: 30px;
}
.swagger-section .auth_container .key_auth__field {
  margin: 5px 0;
}
.swagger-section .auth_container .key_auth__label {
  display: inline-block;
  width: 60px;
}
.swagger-section .api-popup-dialog {
  position: absolute;
  display: none;
}
.swagger-section .api-popup-dialog-wrapper {
  z-index: 1000;
  width: 500px;
  background: #FFF;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 13px;
  color: #777;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.swagger-section .api-popup-dialog-shadow {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.2;
  background-color: gray;
  z-index: 900;
}
.swagger-section .api-popup-dialog .api-popup-title {
  font-size: 24px;
  padding: 10px 0;
}
.swagger-section .api-popup-dialog .api-popup-title {
  font-size: 24px;
  padding: 10px 0;
}
.swagger-section .api-popup-dialog .error-msg {
  padding-left: 5px;
  padding-bottom: 5px;
}
.swagger-section .api-popup-dialog .api-popup-content {
  max-height: 500px;
  overflow-y: auto;
}
.swagger-section .api-popup-dialog .api-popup-authbtn {
  height: 30px;
}
.swagger-section .api-popup-dialog .api-popup-cancel {
  height: 30px;
}
.swagger-section .api-popup-scopes {
  padding: 10px 20px;
}
.swagger-section .api-popup-scopes li {
  padding: 5px 0;
  line-height: 20px;
}
.swagger-section .api-popup-scopes li input {
  position: relative;
  top: 2px;
}
.swagger-section .api-popup-scopes .api-scope-desc {
  padding-left: 20px;
  font-style: italic;
}
.swagger-section .api-popup-actions {
  padding-top: 10px;
}
.swagger-section .access {
  float: right;
}
.swagger-section .auth {
  float: right;
}
.swagger-section .api-ic {
  height: 18px;
  vertical-align: middle;
  display: inline-block;
  background: url(../images/explorer_icons.png) no-repeat;
}
.swagger-section .api-ic .api_information_panel {
  position: relative;
  margin-top: 20px;
  margin-left: -5px;
  background: #FFF;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: none;
  font-size: 13px;
  max-width: 300px;
  line-height: 30px;
  color: black;
  padding: 5px;
}
.swagger-section .api-ic .api_information_panel p .api-msg-enabled {
  color: green;
}
.swagger-section .api-ic .api_information_panel p .api-msg-disabled {
  color: red;
}
.swagger-section .api-ic:hover .api_information_panel {
  position: absolute;
  display: block;
}
.swagger-section .ic-info {
  background-position: 0 0;
  width: 18px;
  margin-top: -6px;
  margin-left: 4px;
}
.swagger-section .ic-warning {
  background-position: -60px 0;
  width: 18px;
  margin-top: -6px;
  margin-left: 4px;
}
.swagger-section .ic-error {
  background-position: -30px 0;
  width: 18px;
  margin-top: -6px;
  margin-left: 4px;
}
.swagger-section .ic-off {
  background-position: -90px 0;
  width: 58px;
  margin-top: -4px;
  cursor: pointer;
}
.swagger-section .ic-on {
  background-position: -160px 0;
  width: 58px;
  margin-top: -4px;
  cursor: pointer;
}
.swagger-section #header {
  background-color: #89bf04;
  padding: 9px 14px 19px 14px;
  height: 23px;
  min-width: 775px;
}
.swagger-section #input_baseUrl {
  width: 400px;
}
.swagger-section #api_selector {
  display: block;
  clear: none;
  float: right;
}
.swagger-section #api_selector .input {
  display: inline-block;
  clear: none;
  margin: 0 10px 0 0;
}
.swagger-section #api_selector input {
  font-size: 0.9em;
  padding: 3px;
  margin: 0;
}
.swagger-section #input_apiKey {
  width: 200px;
}
.swagger-section #explore,
.swagger-section #auth_container .authorize__btn {
  display: block;
  text-decoration: none;
  font-weight: bold;
  padding: 6px 8px;
  font-size: 0.9em;
  color: white;
  background-color: #547f00;
  -moz-border-radius: 4px;
  -webkit-border-radius: 4px;
  -o-border-radius: 4px;
  -ms-border-radius: 4px;
  -khtml-border-radius: 4px;
  border-radius: 4px;
}
.swagger-section #explore:hover,
.swagger-section #auth_container .authorize__btn:hover {
  background-color: #547f00;
}
.swagger-section #header #logo {
  font-size: 1.5em;
  font-weight: bold;
  text-decoration: none;
  color: white;
}
.swagger-section #header #logo .logo__img {
  display: block;
  float: left;
  margin-top: 2px;
}
.swagger-section #header #logo .logo__title {
  display: inline-block;
  padding: 5px 0 0 10px;
}
.swagger-section #content_message {
  margin: 10px 15px;
  font-style: italic;
  color: #999999;
}
.swagger-section #message-bar {
  min-height: 30px;
  text-align: center;
  padding-top: 10px;
}
.swagger-section .swagger-collapse:before {
  content: "-";
}
.swagger-section .swagger-expand:before {
  content: "+";
}
.swagger-section .error {
  outline-color: #cc0000;
  background-color: #f2dede;
}

/**
 * Swagger UI theme overrides
 *
 * Author: Mark Ostrander
 * Github: https://github.com/ostranme/swagger-ui-themes
 */
.swagger-section pre .string,
.swagger-section pre .title,
.swagger-section pre .constant,
.swagger-section pre .parent,
.swagger-section pre .tag .value,
.swagger-section pre .rules .value,
.swagger-section pre .rules .value .number,
.swagger-section pre .preprocessor,
.swagger-section pre .ruby .symbol,
.swagger-section pre .ruby .symbol .string,
.swagger-section pre .aggregate,
.swagger-section pre .template_tag,
.swagger-section pre .django .variable,
.swagger-section pre .smalltalk .class,
.swagger-section pre .addition,
.swagger-section pre .flow,
.swagger-section pre .stream,
.swagger-section pre .bash .variable,
.swagger-section pre .apache .tag,
.swagger-section pre .apache .cbracket,
.swagger-section pre .tex .command,
.swagger-section pre .tex .special,
.swagger-section pre .erlang_repl .function_or_atom,
.swagger-section pre .markdown .header {
  color: #FF1744;
}
.swagger-section pre .number,
.swagger-section pre .date,
.swagger-section pre .regexp,
.swagger-section pre .literal,
.swagger-section pre .smalltalk .symbol,
.swagger-section pre .smalltalk .char,
.swagger-section pre .go .constant,
.swagger-section pre .change,
.swagger-section pre .markdown .bullet,
.swagger-section pre .markdown .link_url {
  color: #69F0AE;
}
.swagger-section .swagger-ui-wrap a {
  color: #01579B;
}
.swagger-section .hljs, .swagger-section .hljs-subst {
  color: #FFFFFF;
}
.swagger-section .hljs-type, .swagger-section .hljs-string, .swagger-section .hljs-number, .swagger-section .hljs-selector-id, .swagger-section .hljs-selector-class, .swagger-section .hljs-quote, .swagger-section .hljs-template-tag, .swagger-section .hljs-deletion {
  color: #69F0AE;
}
.swagger-section pre code, .swagger-section pre .subst, .swagger-section pre .tag .title, .swagger-section pre .lisp .title, .swagger-section pre .clojure .built_in, .swagger-section pre .nginx .title {
  color: #f1f1f1;
}
.swagger-section .swagger-ui-wrap pre {
  background-color: #272822;
  border: 1px solid #272822;
}
.swagger-section .swagger-ui-wrap .model-signature pre:hover {
  background-color: #000000;
}
.swagger-section .swagger-ui-wrap .markdown h3 {
  color: #222222;
}
.swagger-section .swagger-ui-wrap .markdown h4 {
  color: #666666;
}
.swagger-section .swagger-ui-wrap .markdown pre {
  background-color: #272822;
  border: 1px solid #272822;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation div.content div.response div.block pre {
  color: white;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation div.heading h3 span.path a {
  color: white;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.put div.heading {
  background-color: #272822;
  border: 1px solid #272822;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.put div.heading h3 span.http_method a {
  background-color: #FD971F;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.put div.heading ul.options li {
  color: #FD971F;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.put div.heading ul.options li a {
  color: #FD971F;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.put div.content {
  background-color: #ECF0F1;
  border: 1px solid #272822;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.put div.content h4 {
  color: #FD971F;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.head div.heading {
  background-color: #272822;
  border: 1px solid #272822;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.head div.heading h3 span.http_method a {
  background-color: #F7CA18;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.head div.heading ul.options li {
  color: #F7CA18;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.head div.heading ul.options li a {
  color: #F7CA18;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.head div.content {
  background-color: #ECF0F1;
  border: 1px solid #272822;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.head div.content h4 {
  color: #F7CA18;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.delete div.heading {
  background-color: #272822;
  border: 1px solid #272822;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.delete div.heading h3 span.http_method a {
  background-color: #CB4876;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.delete div.heading ul.options li {
  color: #CB4876;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.delete div.heading ul.options li a {
  color: #CB4876;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.delete div.content {
  background-color: #ECF0F1;
  border: 1px solid #272822;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.delete div.content h4 {
  color: #CB4876;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.post div.heading {
  background-color: #272822;
  border: 1px solid #272822;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.post div.heading h3 span.http_method a {
  background-color: #86C30D;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.post div.heading ul.options li {
  color: #86C30D;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.post div.heading ul.options li a {
  color: #86C30D;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.post div.content {
  background-color: #ECF0F1;
  border: 1px solid #272822;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.post div.content h4 {
  color: #86C30D;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.post div.content div.sandbox_header a {
  color: #86C30D;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.patch div.heading {
  background-color: #272822;
  border: 1px solid #272822;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.patch div.heading h3 span.http_method a {
  background-color: #D38042;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.patch div.heading ul.options li {
  color: #D38042;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.patch div.heading ul.options li a {
  color: #D38042;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.patch div.content {
  background-color: #ECF0F1;
  border: 1px solid #272822;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.patch div.content h4 {
  color: #D38042;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.get div.heading {
  background-color: #272822;
  border: 1px solid #272822;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.get div.heading h3 span.http_method a {
  background-color: #1DB4D0;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.get div.heading ul.options li {
  color: #1DB4D0;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.get div.heading ul.options li a {
  color: #1DB4D0;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.get div.content {
  background-color: #ECF0F1;
  border: 1px solid #272822;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.get div.content h4 {
  color: #1DB4D0;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.options div.heading {
  background-color: #ECF0F1;
  border: 1px solid #272822;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.options div.heading h3 span.http_method a {
  background-color: #29B6F6;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.options div.heading ul.options li {
  color: #29B6F6;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.options div.heading ul.options li a {
  color: #29B6F6;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.options div.content {
  background-color: #ECF0F1;
  border: 1px solid #272822;
}
.swagger-section .swagger-ui-wrap ul#resources li.resource ul.endpoints li.endpoint ul.operations li.operation.options div.content h4 {
  color: #29B6F6;
}
.swagger-section #header {
  background-color: #272822;
}
.swagger-section #explore,
.swagger-section #auth_container .authorize__btn {
  color: #272822;
  background-color: #FFFFFF;
}
.swagger-section #explore:hover,
.swagger-section #auth_container .authorize__btn:hover {
    background-color: #FFFFFF;
}
`

const monokaiTheme3 = `@charset "UTF-8";
.swagger-ui html {
  box-sizing: border-box
}

.swagger-ui *, .swagger-ui :after, .swagger-ui :before {
  box-sizing: inherit
}

.swagger-ui body {
  margin: 0;
  background: #fafafa
}

.swagger-ui .wrapper {
  width: 100%;
  max-width: 1460px;
  margin: 0 auto;
  padding: 0 20px
}

.swagger-ui .opblock-tag-section {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column
}

.swagger-ui .opblock-tag {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 10px 20px 10px 10px;
  cursor: pointer;
  -webkit-transition: all .2s;
  transition: all .2s;
  border-bottom: 1px solid rgba(59, 65, 81, .3);
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center
}

.swagger-ui .opblock-tag:hover {
  background: rgba(0, 0, 0, .02)
}

.swagger-ui .opblock-tag {
  font-size: 24px;
  margin: 0 0 5px;
  font-family: Titillium Web, sans-serif;
  color: #3b4151
}

.swagger-ui .opblock-tag.no-desc span {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1
}

.swagger-ui .opblock-tag svg {
  -webkit-transition: all .4s;
  transition: all .4s
}

.swagger-ui .opblock-tag small {
  font-size: 14px;
  font-weight: 400;
  padding: 0 10px;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  font-family: Open Sans, sans-serif;
  color: #3b4151
}

.swagger-ui .parаmeter__type {
  font-size: 12px;
  padding: 5px 0;
  font-family: Source Code Pro, monospace;
  font-weight: 600;
  color: #3b4151
}

.swagger-ui .view-line-link {
  position: relative;
  top: 3px;
  width: 20px;
  margin: 0 5px;
  cursor: pointer;
  -webkit-transition: all .5s;
  transition: all .5s
}

.swagger-ui .opblock {
  margin: 0 0 15px;
  border: 1px solid #000;
  border-radius: 4px;
  box-shadow: 0 0 3px rgba(0, 0, 0, .19)
}

.swagger-ui .opblock.is-open .opblock-summary {
  border-bottom: 1px solid #000
}

.swagger-ui .opblock .opblock-section-header {
  padding: 8px 20px;
  background: hsla(0, 0%, 100%, .8);
  box-shadow: 0 1px 2px rgba(0, 0, 0, .1)
}

.swagger-ui .opblock .opblock-section-header, .swagger-ui .opblock .opblock-section-header label {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center
}

.swagger-ui .opblock .opblock-section-header label {
  font-size: 12px;
  font-weight: 700;
  margin: 0;
  font-family: Titillium Web, sans-serif;
  color: #3b4151
}

.swagger-ui .opblock .opblock-section-header label span {
  padding: 0 10px 0 0
}

.swagger-ui .opblock .opblock-section-header h4 {
  font-size: 14px;
  margin: 0;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  font-family: Titillium Web, sans-serif;
  color: #3b4151
}

.swagger-ui .opblock .opblock-summary-method {
  font-size: 14px;
  font-weight: 700;
  min-width: 80px;
  padding: 6px 15px;
  text-align: center;
  border-radius: 3px;
  background: #000;
  text-shadow: 0 1px 0 rgba(0, 0, 0, .1);
  font-family: Titillium Web, sans-serif;
  color: #fff
}

.swagger-ui .opblock .opblock-summary-path, .swagger-ui .opblock .opblock-summary-path__deprecated {
  font-size: 16px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 0 10px;
  font-family: Source Code Pro, monospace;
  font-weight: 600;
  color: #3b4151;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center
}

.swagger-ui .opblock .opblock-summary-path .view-line-link, .swagger-ui .opblock .opblock-summary-path__deprecated .view-line-link {
  position: relative;
  top: 2px;
  width: 0;
  margin: 0;
  cursor: pointer;
  -webkit-transition: all .5s;
  transition: all .5s
}

.swagger-ui .opblock .opblock-summary-path:hover .view-line-link, .swagger-ui .opblock .opblock-summary-path__deprecated:hover .view-line-link {
  width: 18px;
  margin: 0 5px
}

.swagger-ui .opblock .opblock-summary-path__deprecated {
  text-decoration: line-through
}

.swagger-ui .opblock .opblock-summary-description {
  font-size: 13px;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  font-family: Open Sans, sans-serif;
  color: #3b4151
}

.swagger-ui .opblock .opblock-summary {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 5px;
  cursor: pointer;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center
}

.swagger-ui .opblock.opblock-post {
  border-color: #49cc90;
  background: rgba(73, 204, 144, .1)
}

.swagger-ui .opblock.opblock-post .opblock-summary-method {
  background: #49cc90
}

.swagger-ui .opblock.opblock-post .opblock-summary {
  border-color: #49cc90
}

.swagger-ui .opblock.opblock-put {
  border-color: #fca130;
  background: rgba(252, 161, 48, .1)
}

.swagger-ui .opblock.opblock-put .opblock-summary-method {
  background: #fca130
}

.swagger-ui .opblock.opblock-put .opblock-summary {
  border-color: #fca130
}

.swagger-ui .opblock.opblock-delete {
  border-color: #f93e3e;
  background: rgba(249, 62, 62, .1)
}

.swagger-ui .opblock.opblock-delete .opblock-summary-method {
  background: #f93e3e
}

.swagger-ui .opblock.opblock-delete .opblock-summary {
  border-color: #f93e3e
}

.swagger-ui .opblock.opblock-get {
  border-color: #61affe;
  background: rgba(97, 175, 254, .1)
}

.swagger-ui .opblock.opblock-get .opblock-summary-method {
  background: #61affe
}

.swagger-ui .opblock.opblock-get .opblock-summary {
  border-color: #61affe
}

.swagger-ui .opblock.opblock-patch {
  border-color: #50e3c2;
  background: rgba(80, 227, 194, .1)
}

.swagger-ui .opblock.opblock-patch .opblock-summary-method {
  background: #50e3c2
}

.swagger-ui .opblock.opblock-patch .opblock-summary {
  border-color: #50e3c2
}

.swagger-ui .opblock.opblock-head {
  border-color: #9012fe;
  background: rgba(144, 18, 254, .1)
}

.swagger-ui .opblock.opblock-head .opblock-summary-method {
  background: #9012fe
}

.swagger-ui .opblock.opblock-head .opblock-summary {
  border-color: #9012fe
}

.swagger-ui .opblock.opblock-options {
  border-color: #0d5aa7;
  background: rgba(13, 90, 167, .1)
}

.swagger-ui .opblock.opblock-options .opblock-summary-method {
  background: #0d5aa7
}

.swagger-ui .opblock.opblock-options .opblock-summary {
  border-color: #0d5aa7
}

.swagger-ui .opblock.opblock-deprecated {
  opacity: .6;
  border-color: #ebebeb;
  background: hsla(0, 0%, 92%, .1)
}

.swagger-ui .opblock.opblock-deprecated .opblock-summary-method {
  background: #ebebeb
}

.swagger-ui .opblock.opblock-deprecated .opblock-summary {
  border-color: #ebebeb
}

.swagger-ui .tab {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin: 20px 0 10px;
  padding: 0;
  list-style: none
}

.swagger-ui .tab li {
  font-size: 12px;
  min-width: 100px;
  min-width: 90px;
  padding: 0;
  cursor: pointer;
  font-family: Titillium Web, sans-serif;
  color: #3b4151
}

.swagger-ui .tab li:first-of-type {
  position: relative;
  padding-left: 0
}

.swagger-ui .tab li:first-of-type:after {
  position: absolute;
  top: 0;
  right: 6px;
  width: 1px;
  height: 100%;
  content: "";
  background: rgba(0, 0, 0, .2)
}

.swagger-ui .tab li.active {
  font-weight: 700
}

.swagger-ui .opblock-description-wrapper, .swagger-ui .opblock-title_normal {
  padding: 15px 20px
}

.swagger-ui .opblock-description-wrapper, .swagger-ui .opblock-description-wrapper h4, .swagger-ui .opblock-title_normal, .swagger-ui .opblock-title_normal h4 {
  font-size: 12px;
  margin: 0 0 5px;
  font-family: Open Sans, sans-serif;
  color: #3b4151
}

.swagger-ui .opblock-description-wrapper p, .swagger-ui .opblock-title_normal p {
  font-size: 14px;
  margin: 0;
  font-family: Open Sans, sans-serif;
  color: #3b4151
}

.swagger-ui .execute-wrapper {
  padding: 20px;
  text-align: right
}

.swagger-ui .execute-wrapper .btn {
  width: 100%;
  padding: 8px 40px
}

.swagger-ui .body-param-options {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column
}

.swagger-ui .body-param-options .body-param-edit {
  padding: 10px 0
}

.swagger-ui .body-param-options label {
  padding: 8px 0
}

.swagger-ui .body-param-options label select {
  margin: 3px 0 0
}

.swagger-ui .responses-inner {
  padding: 20px
}

.swagger-ui .responses-inner h4, .swagger-ui .responses-inner h5 {
  font-size: 12px;
  margin: 10px 0 5px;
  font-family: Open Sans, sans-serif;
  color: #3b4151
}

.swagger-ui .response-col_status {
  font-size: 14px;
  font-family: Open Sans, sans-serif;
  color: #3b4151
}

.swagger-ui .response-col_status .response-undocumented {
  font-size: 11px;
  font-family: Source Code Pro, monospace;
  font-weight: 600;
  color: #999
}

.swagger-ui .response-col_description__inner span {
  font-size: 12px;
  font-style: italic;
  display: block;
  margin: 10px 0;
  padding: 10px;
  border-radius: 4px;
  background: #41444e;
  font-family: Source Code Pro, monospace;
  font-weight: 600;
  color: #fff
}

.swagger-ui .response-col_description__inner span p {
  margin: 0
}

.swagger-ui .opblock-body pre {
  font-size: 12px;
  margin: 0;
  padding: 10px;
  white-space: pre-wrap;
  border-radius: 4px;
  background: #41444e;
  font-family: Source Code Pro, monospace;
  font-weight: 600;
  color: #fff
}

.swagger-ui .opblock-body pre span {
  color: #fff!important
}

.swagger-ui .scheme-container {
  margin: 0 0 20px;
  padding: 30px 0;
  background: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .15)
}

.swagger-ui .scheme-container .schemes {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center
}

.swagger-ui .scheme-container .schemes>label {
  font-size: 12px;
  font-weight: 700;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  margin: -20px 15px 0 0;
  font-family: Titillium Web, sans-serif;
  color: #3b4151
}

.swagger-ui .scheme-container .schemes>label select {
  min-width: 130px;
  text-transform: uppercase
}

.swagger-ui .loading-container {
  padding: 40px 0 60px
}

.swagger-ui .loading-container .loading {
  position: relative
}

.swagger-ui .loading-container .loading:after {
  font-size: 10px;
  font-weight: 700;
  position: absolute;
  top: 50%;
  left: 50%;
  content: "loading";
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-transform: uppercase;
  font-family: Titillium Web, sans-serif;
  color: #3b4151
}

.swagger-ui .loading-container .loading:before {
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  width: 60px;
  height: 60px;
  margin: -30px;
  content: "";
  -webkit-animation: rotation 1s infinite linear, opacity .5s;
  animation: rotation 1s infinite linear, opacity .5s;
  opacity: 1;
  border: 2px solid rgba(85, 85, 85, .1);
  border-top-color: rgba(0, 0, 0, .6);
  border-radius: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden
}

@-webkit-keyframes rotation {
  to {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn)
  }
}

@keyframes rotation {
  to {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn)
  }
}

@-webkit-keyframes blinker {
  50% {
    opacity: 0
  }
}

@keyframes blinker {
  50% {
    opacity: 0
  }
}

.swagger-ui .btn {
  font-size: 14px;
  font-weight: 700;
  padding: 5px 23px;
  -webkit-transition: all .3s;
  transition: all .3s;
  border: 2px solid #888;
  border-radius: 4px;
  background: transparent;
  box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
  font-family: Titillium Web, sans-serif;
  color: #3b4151
}

.swagger-ui .btn[disabled] {
  cursor: not-allowed;
  opacity: .3
}

.swagger-ui .btn:hover {
  box-shadow: 0 0 5px rgba(0, 0, 0, .3)
}

.swagger-ui .btn.cancel {
  border-color: #ff6060;
  font-family: Titillium Web, sans-serif;
  color: #ff6060
}

.swagger-ui .btn.authorize {
  line-height: 1;
  display: inline;
  color: #49cc90;
  border-color: #49cc90
}

.swagger-ui .btn.authorize span {
  float: left;
  padding: 4px 20px 0 0
}

.swagger-ui .btn.authorize svg {
  fill: #49cc90
}

.swagger-ui .btn.execute {
  -webkit-animation: pulse 2s infinite;
  animation: pulse 2s infinite;
  color: #fff;
  border-color: #4990e2
}

@-webkit-keyframes pulse {
  0% {
    color: #fff;
    background: #4990e2;
    box-shadow: 0 0 0 0 rgba(73, 144, 226, .8)
  }
  70% {
    box-shadow: 0 0 0 5px rgba(73, 144, 226, 0)
  }
  to {
    color: #fff;
    background: #4990e2;
    box-shadow: 0 0 0 0 rgba(73, 144, 226, 0)
  }
}

@keyframes pulse {
  0% {
    color: #fff;
    background: #4990e2;
    box-shadow: 0 0 0 0 rgba(73, 144, 226, .8)
  }
  70% {
    box-shadow: 0 0 0 5px rgba(73, 144, 226, 0)
  }
  to {
    color: #fff;
    background: #4990e2;
    box-shadow: 0 0 0 0 rgba(73, 144, 226, 0)
  }
}

.swagger-ui .btn-group {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 30px
}

.swagger-ui .btn-group .btn {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1
}

.swagger-ui .btn-group .btn:first-child {
  border-radius: 4px 0 0 4px
}

.swagger-ui .btn-group .btn:last-child {
  border-radius: 0 4px 4px 0
}

.swagger-ui .authorization__btn {
  padding: 0 10px;
  border: none;
  background: none
}

.swagger-ui .authorization__btn.locked {
  opacity: 1
}

.swagger-ui .authorization__btn.unlocked {
  opacity: .4
}

.swagger-ui .expand-methods, .swagger-ui .expand-operation {
  border: none;
  background: none
}

.swagger-ui .expand-methods svg, .swagger-ui .expand-operation svg {
  width: 20px;
  height: 20px
}

.swagger-ui .expand-methods {
  padding: 0 10px
}

.swagger-ui .expand-methods:hover svg {
  fill: #444
}

.swagger-ui .expand-methods svg {
  -webkit-transition: all .3s;
  transition: all .3s;
  fill: #777
}

.swagger-ui button {
  cursor: pointer;
  outline: none
}

.swagger-ui select {
  font-size: 14px;
  font-weight: 700;
  padding: 5px 40px 5px 10px;
  border: 2px solid #41444e;
  border-radius: 4px;
  background: #f7f7f7 url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+ICAgIDxwYXRoIGQ9Ik0xMy40MTggNy44NTljLjI3MS0uMjY4LjcwOS0uMjY4Ljk3OCAwIC4yNy4yNjguMjcyLjcwMSAwIC45NjlsLTMuOTA4IDMuODNjLS4yNy4yNjgtLjcwNy4yNjgtLjk3OSAwbC0zLjkwOC0zLjgzYy0uMjctLjI2Ny0uMjctLjcwMSAwLS45NjkuMjcxLS4yNjguNzA5LS4yNjguOTc4IDBMMTAgMTFsMy40MTgtMy4xNDF6Ii8+PC9zdmc+) right 10px center no-repeat;
  background-size: 20px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .25);
  font-family: Titillium Web, sans-serif;
  color: #3b4151;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none
}

.swagger-ui select[multiple] {
  margin: 5px 0;
  padding: 5px;
  background: #f7f7f7
}

.swagger-ui .opblock-body select {
  min-width: 230px
}

.swagger-ui label {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 5px;
  font-family: Titillium Web, sans-serif;
  color: #3b4151
}

.swagger-ui input[type=email], .swagger-ui input[type=password], .swagger-ui input[type=search], .swagger-ui input[type=text] {
  min-width: 100px;
  margin: 5px 0;
  padding: 8px 10px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background: #fff
}

.swagger-ui input[type=email].invalid, .swagger-ui input[type=password].invalid, .swagger-ui input[type=search].invalid, .swagger-ui input[type=text].invalid {
  -webkit-animation: shake .4s 1;
  animation: shake .4s 1;
  border-color: #f93e3e;
  background: #feebeb
}

@-webkit-keyframes shake {
  10%, 90% {
    -webkit-transform: translate3d(-1px, 0, 0);
    transform: translate3d(-1px, 0, 0)
  }
  20%, 80% {
    -webkit-transform: translate3d(2px, 0, 0);
    transform: translate3d(2px, 0, 0)
  }
  30%, 50%, 70% {
    -webkit-transform: translate3d(-4px, 0, 0);
    transform: translate3d(-4px, 0, 0)
  }
  40%, 60% {
    -webkit-transform: translate3d(4px, 0, 0);
    transform: translate3d(4px, 0, 0)
  }
}

@keyframes shake {
  10%, 90% {
    -webkit-transform: translate3d(-1px, 0, 0);
    transform: translate3d(-1px, 0, 0)
  }
  20%, 80% {
    -webkit-transform: translate3d(2px, 0, 0);
    transform: translate3d(2px, 0, 0)
  }
  30%, 50%, 70% {
    -webkit-transform: translate3d(-4px, 0, 0);
    transform: translate3d(-4px, 0, 0)
  }
  40%, 60% {
    -webkit-transform: translate3d(4px, 0, 0);
    transform: translate3d(4px, 0, 0)
  }
}

.swagger-ui textarea {
  font-size: 12px;
  width: 100%;
  min-height: 280px;
  padding: 10px;
  border: none;
  border-radius: 4px;
  outline: none;
  background: hsla(0, 0%, 100%, .8);
  font-family: Source Code Pro, monospace;
  font-weight: 600;
  color: #3b4151
}

.swagger-ui textarea:focus {
  border: 2px solid #61affe
}

.swagger-ui textarea.curl {
  font-size: 12px;
  min-height: 100px;
  margin: 0;
  padding: 10px;
  resize: none;
  border-radius: 4px;
  background: #41444e;
  font-family: Source Code Pro, monospace;
  font-weight: 600;
  color: #fff
}

.swagger-ui .checkbox {
  padding: 5px 0 10px;
  -webkit-transition: opacity .5s;
  transition: opacity .5s;
  color: #333
}

.swagger-ui .checkbox label {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex
}

.swagger-ui .checkbox p {
  font-weight: 400!important;
  font-style: italic;
  margin: 0!important;
  font-family: Source Code Pro, monospace;
  font-weight: 600;
  color: #3b4151
}

.swagger-ui .checkbox input[type=checkbox] {
  display: none
}

.swagger-ui .checkbox input[type=checkbox]+label>.item {
  position: relative;
  top: 3px;
  display: inline-block;
  width: 16px;
  height: 16px;
  margin: 0 8px 0 0;
  padding: 5px;
  cursor: pointer;
  border-radius: 1px;
  background: #e8e8e8;
  box-shadow: 0 0 0 2px #e8e8e8;
  -webkit-box-flex: 0;
  -ms-flex: none;
  flex: none
}

.swagger-ui .checkbox input[type=checkbox]+label>.item:active {
  -webkit-transform: scale(.9);
  transform: scale(.9)
}

.swagger-ui .checkbox input[type=checkbox]:checked+label>.item {
  background: #e8e8e8 url("data:image/svg+xml;charset=utf-8,%3Csvg width='10' height='8' viewBox='3 7 10 8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%2341474E' fill-rule='evenodd' d='M6.333 15L3 11.667l1.333-1.334 2 2L11.667 7 13 8.333z'/%3E%3C/svg%3E") 50% no-repeat
}

.swagger-ui .dialog-ux {
  position: fixed;
  z-index: 9999;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0
}

.swagger-ui .dialog-ux .backdrop-ux {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, .8)
}

.swagger-ui .dialog-ux .modal-ux {
  position: absolute;
  z-index: 9999;
  top: 50%;
  left: 50%;
  width: 100%;
  min-width: 300px;
  max-width: 650px;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  border: 1px solid #ebebeb;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 10px 30px 0 rgba(0, 0, 0, .2)
}

.swagger-ui .dialog-ux .modal-ux-content {
  overflow-y: auto;
  max-height: 540px;
  padding: 20px
}

.swagger-ui .dialog-ux .modal-ux-content p {
  font-size: 12px;
  margin: 0 0 5px;
  color: #41444e;
  font-family: Open Sans, sans-serif;
  color: #3b4151
}

.swagger-ui .dialog-ux .modal-ux-content h4 {
  font-size: 18px;
  font-weight: 600;
  margin: 15px 0 0;
  font-family: Titillium Web, sans-serif;
  color: #3b4151
}

.swagger-ui .dialog-ux .modal-ux-header {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 12px 0;
  border-bottom: 1px solid #ebebeb;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center
}

.swagger-ui .dialog-ux .modal-ux-header .close-modal {
  padding: 0 10px;
  border: none;
  background: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none
}

.swagger-ui .dialog-ux .modal-ux-header h3 {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  padding: 0 20px;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  font-family: Titillium Web, sans-serif;
  color: #3b4151
}

.swagger-ui .model {
  font-size: 12px;
  font-weight: 300;
  font-family: Source Code Pro, monospace;
  font-weight: 600;
  color: #3b4151
}

.swagger-ui .model-toggle {
  font-size: 10px;
  position: relative;
  top: 6px;
  display: inline-block;
  margin: auto .3em;
  cursor: pointer;
  -webkit-transition: -webkit-transform .15s ease-in;
  transition: -webkit-transform .15s ease-in;
  transition: transform .15s ease-in;
  transition: transform .15s ease-in, -webkit-transform .15s ease-in;
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
  -webkit-transform-origin: 50% 50%;
  transform-origin: 50% 50%
}

.swagger-ui .model-toggle.collapsed {
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg)
}

.swagger-ui .model-toggle:after {
  display: block;
  width: 20px;
  height: 20px;
  content: "";
  background: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z'/%3E%3C/svg%3E") 50% no-repeat;
  background-size: 100%
}

.swagger-ui .model-jump-to-path {
  position: relative;
  cursor: pointer
}

.swagger-ui .model-jump-to-path .view-line-link {
  position: absolute;
  top: -.4em;
  cursor: pointer
}

.swagger-ui .model-title {
  position: relative
}

.swagger-ui .model-title:hover .model-hint {
  visibility: visible
}

.swagger-ui .model-hint {
  position: absolute;
  top: -1.8em;
  visibility: hidden;
  padding: .1em .5em;
  white-space: nowrap;
  color: #ebebeb;
  border-radius: 4px;
  background: rgba(0, 0, 0, .7)
}

.swagger-ui section.models {
  margin: 30px 0;
  border: 1px solid rgba(59, 65, 81, .3);
  border-radius: 4px
}

.swagger-ui section.models.is-open {
  padding: 0 0 20px
}

.swagger-ui section.models.is-open h4 {
  margin: 0 0 5px;
  border-bottom: 1px solid rgba(59, 65, 81, .3)
}

.swagger-ui section.models.is-open h4 svg {
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg)
}

.swagger-ui section.models h4 {
  font-size: 16px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin: 0;
  padding: 10px 20px 10px 10px;
  cursor: pointer;
  -webkit-transition: all .2s;
  transition: all .2s;
  font-family: Titillium Web, sans-serif;
  color: #777;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center
}

.swagger-ui section.models h4 svg {
  -webkit-transition: all .4s;
  transition: all .4s
}

.swagger-ui section.models h4 span {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1
}

.swagger-ui section.models h4:hover {
  background: rgba(0, 0, 0, .02)
}

.swagger-ui section.models h5 {
  font-size: 16px;
  margin: 0 0 10px;
  font-family: Titillium Web, sans-serif;
  color: #777
}

.swagger-ui section.models .model-jump-to-path {
  position: relative;
  top: 5px
}

.swagger-ui section.models .model-container {
  margin: 0 20px 15px;
  -webkit-transition: all .5s;
  transition: all .5s;
  border-radius: 4px;
  background: rgba(0, 0, 0, .05)
}

.swagger-ui section.models .model-container:hover {
  background: rgba(0, 0, 0, .07)
}

.swagger-ui section.models .model-container:first-of-type {
  margin: 20px
}

.swagger-ui section.models .model-container:last-of-type {
  margin: 0 20px
}

.swagger-ui section.models .model-box {
  background: none
}

.swagger-ui .model-box {
  padding: 10px;
  border-radius: 4px;
  background: rgba(0, 0, 0, .1)
}

.swagger-ui .model-box .model-jump-to-path {
  position: relative;
  top: 4px
}

.swagger-ui .model-title {
  font-size: 16px;
  font-family: Titillium Web, sans-serif;
  color: #555
}

.swagger-ui span>span.model, .swagger-ui span>span.model .brace-close {
  padding: 0 0 0 10px
}

.swagger-ui .prop-type {
  color: #55a
}

.swagger-ui .prop-enum {
  display: block
}

.swagger-ui .prop-format {
  color: #999
}

.swagger-ui table {
  width: 100%;
  padding: 0 10px;
  border-collapse: collapse
}

.swagger-ui table.model tbody tr td {
  padding: 0;
  vertical-align: top
}

.swagger-ui table.model tbody tr td:first-of-type {
  width: 100px;
  padding: 0
}

.swagger-ui table.headers td {
  font-size: 12px;
  font-weight: 300;
  vertical-align: middle;
  font-family: Source Code Pro, monospace;
  font-weight: 600;
  color: #3b4151
}

.swagger-ui table tbody tr td {
  padding: 10px 0 0;
  vertical-align: top
}

.swagger-ui table tbody tr td:first-of-type {
  width: 20%;
  padding: 10px 0
}

.swagger-ui table thead tr td, .swagger-ui table thead tr th {
  font-size: 12px;
  font-weight: 700;
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid rgba(59, 65, 81, .2);
  font-family: Open Sans, sans-serif;
  color: #3b4151
}

.swagger-ui .parameters-col_description p {
  font-size: 14px;
  margin: 0;
  font-family: Open Sans, sans-serif;
  color: #3b4151
}

.swagger-ui .parameters-col_description input[type=text] {
  width: 100%;
  max-width: 340px
}

.swagger-ui .parameter__name {
  font-size: 16px;
  font-weight: 400;
  font-family: Titillium Web, sans-serif;
  color: #3b4151
}

.swagger-ui .parameter__name.required {
  font-weight: 700
}

.swagger-ui .parameter__name.required:after {
  font-size: 10px;
  position: relative;
  top: -6px;
  padding: 5px;
  content: "required";
  color: rgba(255, 0, 0, .6)
}

.swagger-ui .parameter__in {
  font-size: 12px;
  font-style: italic;
  font-family: Source Code Pro, monospace;
  font-weight: 600;
  color: #888
}

.swagger-ui .table-container {
  padding: 20px
}

.swagger-ui .topbar {
  padding: 8px 30px;
  background-color: #89bf04
}

.swagger-ui .topbar .topbar-wrapper {
  -ms-flex-align: center
}

.swagger-ui .topbar .topbar-wrapper, .swagger-ui .topbar a {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  align-items: center
}

.swagger-ui .topbar a {
  font-size: 1.5em;
  font-weight: 700;
  text-decoration: none;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  -ms-flex-align: center;
  font-family: Titillium Web, sans-serif;
  color: #fff
}

.swagger-ui .topbar a span {
  margin: 0;
  padding: 0 10px
}

.swagger-ui .topbar .download-url-wrapper {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex
}

.swagger-ui .topbar .download-url-wrapper input[type=text] {
  min-width: 350px;
  margin: 0;
  border: 2px solid #547f00;
  border-radius: 4px 0 0 4px;
  outline: none
}

.swagger-ui .topbar .download-url-wrapper .download-url-button {
  font-size: 16px;
  font-weight: 700;
  padding: 4px 40px;
  border: none;
  border-radius: 0 4px 4px 0;
  background: #547f00;
  font-family: Titillium Web, sans-serif;
  color: #fff
}

.swagger-ui .info {
  margin: 50px 0
}

.swagger-ui .info hgroup.main {
  margin: 0 0 20px
}

.swagger-ui .info hgroup.main a {
  font-size: 12px
}

.swagger-ui .info p {
  font-size: 14px;
  font-family: Open Sans, sans-serif;
  color: #3b4151
}

.swagger-ui .info code {
  padding: 3px 5px;
  border-radius: 4px;
  background: rgba(0, 0, 0, .05);
  font-family: Source Code Pro, monospace;
  font-weight: 600;
  color: #9012fe
}

.swagger-ui .info a {
  font-size: 14px;
  -webkit-transition: all .4s;
  transition: all .4s;
  font-family: Open Sans, sans-serif;
  color: #4990e2
}

.swagger-ui .info a:hover {
  color: #1f69c0
}

.swagger-ui .info>div {
  margin: 0 0 5px
}

.swagger-ui .info .base-url {
  font-size: 12px;
  font-weight: 300!important;
  margin: 0;
  font-family: Source Code Pro, monospace;
  font-weight: 600;
  color: #3b4151
}

.swagger-ui .info .title {
  font-size: 36px;
  margin: 0;
  font-family: Open Sans, sans-serif;
  color: #3b4151
}

.swagger-ui .info .title small {
  font-size: 10px;
  position: relative;
  top: -5px;
  display: inline-block;
  margin: 0 0 0 5px;
  padding: 2px 4px;
  vertical-align: super;
  border-radius: 57px;
  background: #7d8492
}

.swagger-ui .info .title small pre {
  margin: 0;
  font-family: Titillium Web, sans-serif;
  color: #fff
}

.swagger-ui .auth-btn-wrapper {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 10px 0;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center
}

.swagger-ui .auth-wrapper {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end
}

.swagger-ui .auth-wrapper .authorize {
  padding-right: 20px
}

.swagger-ui .auth-container {
  margin: 0 0 10px;
  padding: 10px 20px;
  border-bottom: 1px solid #ebebeb
}

.swagger-ui .auth-container:last-of-type {
  margin: 0;
  padding: 10px 20px;
  border: 0
}

.swagger-ui .auth-container h4 {
  margin: 5px 0 15px!important
}

.swagger-ui .auth-container .wrapper {
  margin: 0;
  padding: 0
}

.swagger-ui .auth-container input[type=password], .swagger-ui .auth-container input[type=text] {
  min-width: 230px
}

.swagger-ui .auth-container .errors {
  font-size: 12px;
  padding: 10px;
  border-radius: 4px;
  font-family: Source Code Pro, monospace;
  font-weight: 600;
  color: #3b4151
}

.swagger-ui .scopes h2 {
  font-size: 14px;
  font-family: Titillium Web, sans-serif;
  color: #3b4151
}

.swagger-ui .scope-def {
  padding: 0 0 20px
}

.swagger-ui .errors-wrapper {
  margin: 20px;
  padding: 10px 20px;
  -webkit-animation: scaleUp .5s;
  animation: scaleUp .5s;
  border: 2px solid #f93e3e;
  border-radius: 4px;
  background: rgba(249, 62, 62, .1)
}

.swagger-ui .errors-wrapper .error-wrapper {
  margin: 0 0 10px
}

.swagger-ui .errors-wrapper .errors h4 {
  font-size: 14px;
  margin: 0;
  font-family: Source Code Pro, monospace;
  font-weight: 600;
  color: #3b4151
}

.swagger-ui .errors-wrapper hgroup {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center
}

.swagger-ui .errors-wrapper hgroup h4 {
  font-size: 20px;
  margin: 0;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  font-family: Titillium Web, sans-serif;
  color: #3b4151
}

@-webkit-keyframes scaleUp {
  0% {
    -webkit-transform: scale(.8);
    transform: scale(.8);
    opacity: 0
  }
  to {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1
  }
}

@keyframes scaleUp {
  0% {
    -webkit-transform: scale(.8);
    transform: scale(.8);
    opacity: 0
  }
  to {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1
  }
}

.swagger-ui .Resizer.vertical.disabled {
  display: none
}

/*# sourceMappingURL=swagger-ui.css.map*/

/**
 * Swagger UI Theme Overrides
 *
 * Theme: Monokai
 * Author: Mark Ostrander
 * Github: https://github.com/ostranme/swagger-ui-themes
 */

 .swagger-ui .opblock.opblock-post {
   border-color: #DADFE1;
   background: rgb(39, 40, 34);
 }

 .swagger-ui .opblock.opblock-post .opblock-summary-method {
   background: #86C30D;
 }

 .swagger-ui .opblock.opblock-post .opblock-summary {
   border-color: #DADFE1;
 }

 .swagger-ui .opblock.opblock-put {
   border-color: #DADFE1;
   background: rgb(39, 40, 34);
 }

 .swagger-ui .opblock.opblock-put .opblock-summary-method {
   background: #FD971F;
 }

 .swagger-ui .opblock.opblock-put .opblock-summary {
   border-color: #DADFE1;
 }

 .swagger-ui .opblock.opblock-delete {
   border-color: #DADFE1;
   background: rgb(39, 40, 34);
 }

 .swagger-ui .opblock.opblock-delete .opblock-summary-method {
   background: #CB4876;
 }

 .swagger-ui .opblock.opblock-delete .opblock-summary {
   border-color: #DADFE1;
 }

 .swagger-ui .opblock.opblock-get {
   border-color: #DADFE1;
   background: rgb(39, 40, 34);
 }

 .swagger-ui .opblock.opblock-get .opblock-summary-method {
   background: #1DB4D0;
 }

 .swagger-ui .opblock.opblock-get .opblock-summary {
   border-color: #DADFE1;
 }

 .swagger-ui .opblock.opblock-patch {
   border-color: #DADFE1;
   background: rgb(39, 40, 34);
 }

 .swagger-ui .opblock.opblock-patch .opblock-summary-method {
   background: #D38042;
 }

 .swagger-ui .opblock.opblock-patch .opblock-summary {
   border-color: #DADFE1;
 }

 .swagger-ui .opblock.opblock-head {
   border-color: #DADFE1;
   background: rgb(39, 40, 34);
 }

 .swagger-ui .opblock.opblock-head .opblock-summary-method {
   background: #F7CA18;
 }

 .swagger-ui .opblock.opblock-head .opblock-summary {
   border-color: #DADFE1;
 }

 .swagger-ui .opblock.opblock-options {
   border-color: #DADFE1;
   background: rgb(39, 40, 34);
 }

 .swagger-ui .opblock.opblock-options .opblock-summary-method {
   background: #29B6F6;
 }

 .swagger-ui .opblock.opblock-options .opblock-summary {
   border-color: #DADFE1;
 }

 .swagger-ui .opblock.opblock-deprecated {
   opacity: .9;
   border-color: #DADFE1;
   background: rgb(39, 40, 34);
 }

 .swagger-ui .opblock.opblock-deprecated .opblock-summary-method {
   background: #ebebeb
 }

 .swagger-ui .opblock.opblock-deprecated .opblock-summary {
   border-color: #ebebeb
 }

 .swagger-ui .topbar {
   padding: 8px 30px;
   background-color: #272822;
 }

 .swagger-ui .topbar .download-url-wrapper input[type=text] {
   min-width: 350px;
   margin: 0;
   border: 2px solid #DADFE1;
   border-radius: 4px 0 0 4px;
   outline: none;
 }

 .swagger-ui .topbar .download-url-wrapper .download-url-button {
   font-size: 16px;
   font-weight: 700;
   padding: 4px 40px;
   border: none;
   border-radius: 0 4px 4px 0;
   background: #DADFE1;
   font-family: Titillium Web, sans-serif;
   color: #272822;
 }

 .swagger-ui .info a {
   font-size: 14px;
   -webkit-transition: all .4s;
   transition: all .4s;
   font-family: Open Sans, sans-serif;
   color: #272822;
 }

 .swagger-ui .info a:hover {
   color: #272822;
 }

 .swagger-ui .btn.authorize {
   line-height: 1;
   display: inline;
   color: #272822;
   border-color: #272822;
 }

 .swagger-ui .btn.authorize svg {
   fill: #272822;
 }

 .swagger-ui .opblock .opblock-summary-path, .swagger-ui .opblock .opblock-summary-path__deprecated {
   font-size: 16px;
   display: -webkit-box;
   display: -ms-flexbox;
   display: flex;
   padding: 0 10px;
   font-family: Source Code Pro, monospace;
   font-weight: 600;
   color: #ffffff;
   -webkit-box-align: center;
   -ms-flex-align: center;
   align-items: center;
 }

 .swagger-ui .opblock .opblock-summary-description {
   font-size: 13px;
   -webkit-box-flex: 1;
   -ms-flex: 1;
   flex: 1;
   font-family: Open Sans, sans-serif;
   color: #ffffff;
 }

 .swagger-ui table thead tr td, .swagger-ui table thead tr th {
   font-size: 12px;
   font-weight: 700;
   padding: 12px 0;
   text-align: left;
   border-bottom: 1px solid rgba(59, 65, 81, .2);
   font-family: Open Sans, sans-serif;
   color: #ffffff;
 }

 .swagger-ui .parameters-col_description p {
   font-size: 14px;
   margin: 0;
   font-family: Open Sans, sans-serif;
   color: #ffffff;
 }

 .swagger-ui .parameter__name {
   font-size: 16px;
   font-weight: 400;
   font-family: Titillium Web, sans-serif;
   color: #ffffff;
 }

 .swagger-ui .opblock .opblock-section-header label {
   font-size: 12px;
   font-weight: 700;
   margin: 0;
   font-family: Titillium Web, sans-serif;
   color: #3b4151;
 }

 .swagger-ui .opblock .opblock-section-header h4 {
   font-size: 14px;
   margin: 0;
   -webkit-box-flex: 1;
   -ms-flex: 1;
   flex: 1;
   font-family: Titillium Web, sans-serif;
   color: #3b4151;
 }

 .swagger-ui .opblock .opblock-summary-description {
   font-size: 13px;
   -webkit-box-flex: 1;
   -ms-flex: 1;
   flex: 1;
   font-family: Open Sans, sans-serif;
   color: #ffffff;
 }

 .swagger-ui .tab li {
   font-size: 12px;
   min-width: 100px;
   min-width: 90px;
   padding: 0;
   cursor: pointer;
   font-family: Titillium Web, sans-serif;
   color: #ffffff;
 }

 .swagger-ui label {
   font-size: 12px;
   font-weight: 700;
   margin: 0 0 5px;
   font-family: Titillium Web, sans-serif;
   color: #ffffff;
 }

 .swagger-ui .response-col_status {
   font-size: 14px;
   font-family: Open Sans, sans-serif;
   color: #ffffff;
 }

 .swagger-ui .opblock-description-wrapper p, .swagger-ui .opblock-title_normal p {
    font-size: 14px;
    margin: 0;
    font-family: Open Sans, sans-serif;
    color: #ffffff;
}
`

export { monokaiTheme2, monokaiTheme3 }
