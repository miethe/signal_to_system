# Labs releases

One directory belongs to each approved public release.
Each directory contains `manifest.json`, `receipts.json`, `records.json`, and `lab.json`.
The Lab release pipeline produces these files.
Do not hand-edit release files.
Do not put synthetic data here.
Each directory name is its public release identifier.
The loader reads only complete four-file directories.
The projection gate approves releases before the loader renders them.
