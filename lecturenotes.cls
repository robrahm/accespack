% lecturenotes.cls
\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{lecturenotes}[2025/08/17 minimal class for teaching notes]

\LoadClass[12pt]{article} % keep article behavior

% Core packages most folks expect
\RequirePackage[top=1.5in, bottom=1.5in, left=1.25in, right=1.25in]	{geometry}
\RequirePackage{amsmath,amstext,amsthm,amssymb,amsxtra}
\RequirePackage{graphicx}
\RequirePackage{hyperref}
\RequirePackage{enumitem}
\RequirePackage{fancyhdr}
\RequirePackage{microtype}
\RequirePackage{latexml}

% Nice headers/footers
\pagestyle{fancy}
\fancyhf{}
\lhead{\leftmark}
\rhead{\thepage}
\renewcommand{\headrulewidth}{0.4pt}

% Pull in our custom commands/environments
\RequirePackage{lnotes} % defined in lnotes.sty

\endinput
