const DBescape = {
    SQLescape: function(string){
        string = string.replace(/'/g, "\\'");
        string = string.replace(/"/g, '\"');
        string = string.replace(/\\/g, "\\\\");
        string = string.replace(/`/g, "\\`");
        string = string.replace(/\$/g, "\\$");
        string = string.replace(/%/g, "\\%");
        string = string.replace(/;/g, "\\;");
        string = string.replace(/</g, "\<");
        string = string.replace(/>/g, "\>");
        string = string.replace(/\(/g, "\\(");
        string = string.replace(/\)/g, "\\)");
        string = string.replace(/\+/g, "\\+");
        string = string.replace(/\-/g, "\\-");
        string = string.replace(/\*/g, "\\*");
        string = string.replace(/\//g, "\\/");
        string = string.replace(/\^/g, "\\^");
        string = string.replace(/=/g, "\\=");
        string = string.replace(/!/g, "\\!");
        string = string.replace(/#/g, "\\#");
        string = string.replace(/~/g, "\\~");
        string = string.replace(/@/g, "\\@");
        string = string.replace(/&/g, "\\&");
        string = string.replace(/\|/g, "\\|");
        string = string.replace(/\[/g, "\\[");
        string = string.replace(/\]/g, "\\]");
        string = string.replace(/\{/g, "\\{");
        string = string.replace(/\}/g, "\\}");
        string = string.replace(/\?/g, "\\?");
        string = string.replace(/:/g, "\\:");
        string = string.replace(/,/g, "\\,");
        string = string.replace(/\./g, "\\.");
        string = string.replace(/\s/g, "\\s");
        return string;
      },

      SQLunescape: function(string){
        string = string.replace(/\\'/g, "'");
        string = string.replace(/\\"/g, '"');
        string = string.replace(/\\\\/g, "\\");
        string = string.replace(/\\`/g, "`");
        string = string.replace(/\\$/g, "$");
        string = string.replace(/\\%/g, "%");
        string = string.replace(/\\;/g, ";");
        string = string.replace(/\\</g, "<");
        string = string.replace(/\\>/g, ">");
        string = string.replace(/\\\(/g, "(");
        string = string.replace(/\\\)/g, ")");
        string = string.replace(/\\\+/g, "+");
        string = string.replace(/\\\-/g, "-");
        string = string.replace(/\\\*/g, "*");
        string = string.replace(/\\\//g, "/");
        string = string.replace(/\\\^/g, "^");
        string = string.replace(/\\\=/g, "=");
        string = string.replace(/\\\!/g, "!");
        string = string.replace(/\\\#/g, "#");
        string = string.replace(/\\\~/g, "~");
        string = string.replace(/\\\@/g, "@");
        string = string.replace(/\\\&/g, "&");
        string = string.replace(/\\\|/g, "|");
        string = string.replace(/\\\[/g, "[");
        string = string.replace(/\\\]/g, "]");
        string = string.replace(/\\\{/g, "{");
        string = string.replace(/\\\}/g, "}");
        string = string.replace(/\\\?/g, "?");
        string = string.replace(/\\\:/g, ":");
        string = string.replace(/\\\,/g, ",");
        string = string.replace(/\\\./g, ".");
        string = string.replace(/\\s/g, " ");
        return string;
      },
      
      HTMLescape: function(string){
        string = string.replace(/&/g, "&amp;");
        string = string.replace(/</g, "&lt;");
        string = string.replace(/>/g, "&gt;");
        string = string.replace(/"/g, "&quot;");
        string = string.replace(/'/g, "&#039;");
        string = string.replace(/\\s/g, "   ");
        return string;
      }
}

module.exports = DBescape;