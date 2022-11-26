const DBescape = {
    SQLescape: function(string){
      try{
        if(isNaN(string)){
          string = string.replace(/'/g, "\'");
          string = string.replace(/"/g, '\"');
          string = string.replace(/\\/g, "\\\\");
          string = string.replace(/`/g, "\`");
          string = string.replace(/\$/g, "\$");
          string = string.replace(/\%/g, "\%");
          string = string.replace(/;/g, "\;");
          string = string.replace(/</g, "\<");
          string = string.replace(/>/g, "\>");
          string = string.replace(/\(/g, "\(");
          string = string.replace(/\)/g, "\)");
          string = string.replace(/\+/g, "\+");
          string = string.replace(/\-/g, "\-");
          string = string.replace(/\*/g, "\*");
          string = string.replace(/\//g, "\/");
          string = string.replace(/\^/g, "\^");
          string = string.replace(/=/g, "\=");
          string = string.replace(/!/g, "\!");
          string = string.replace(/#/g, "\#");
          string = string.replace(/~/g, "\~");
          string = string.replace(/@/g, "\@");
          string = string.replace(/&/g, "\&");
          string = string.replace(/\|/g, "\|");
          string = string.replace(/\[/g, "\[");
          string = string.replace(/\]/g, "\]");
          string = string.replace(/\{/g, "\{");
          string = string.replace(/\}/g, "\}");
          string = string.replace(/\?/g, "\?");
          string = string.replace(/:/g, "\:");
          string = string.replace(/,/g, "\,");
          string = string.replace(/\./g, "\.");
          return string;
        } else {
          return string;
        }
      }catch(e){
        return string;
      }
      },

      SQLunescape: function(string){
        string = string.replace(/\'/g, "'");
        string = string.replace(/\"/g, '"');
        string = string.replace(/\\\\/g, "\\");
        string = string.replace(/\`/g, "`");
        string = string.replace(/\$/g, "$");
        string = string.replace(/\%/g, "%");
        string = string.replace(/\;/g, ";");
        string = string.replace(/\</g, "<");
        string = string.replace(/\>/g, ">");
        string = string.replace(/\(/g, "(");
        string = string.replace(/\)/g, ")");
        string = string.replace(/\+/g, "+");
        string = string.replace(/\-/g, "-");
        string = string.replace(/\*/g, "*");
        string = string.replace(/\//g, "/");
        string = string.replace(/\^/g, "^");
        string = string.replace(/\=/g, "=");
        string = string.replace(/\!/g, "!");
        string = string.replace(/\#/g, "#");
        string = string.replace(/\~/g, "~");
        string = string.replace(/\@/g, "@");
        string = string.replace(/\&/g, "&");
        string = string.replace(/\\|/g, "|");
        string = string.replace(/\[/g, "[");
        string = string.replace(/\]/g, "]");
        string = string.replace(/\{/g, "{");
        string = string.replace(/\}/g, "}");
        string = string.replace(/\?/g, "?");
        string = string.replace(/\:/g, ":");
        string = string.replace(/\,/g, ",");
        string = string.replace(/\./g, ".");
        return string;
      },
      
      HTMLescape: function(string){
            return string.replace(
                /[^0-9A-Za-z ]/g,
                c => "&#" + c.charCodeAt(0) + ";"
            );
      }
}

module.exports = DBescape;