import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.20.28:0',
  releaseNotes: {
    en_US: `Updated copyparty to 1.20.28.

**Security**

- Directory keys (the \`dk\` volume flag) no longer allow downloading from subfolders or other unintended access
- Users with read access over SFTP can no longer truncate files
- Fixed a cross-site request forgery issue and a cross-site scripting issue

Directory-key and SFTP fixes apply if you enabled those features in custom config files. The cross-site scripting fix matters when viewing malicious Markdown, including files received through upload-enabled share links; StartOS does not enable the protective \`nohtml\` flag. The cross-site request forgery advisory concerns page embedding, especially with relaxed cookie settings.

**Fixes**

- Logging in no longer fails behind some reverse proxies
- Generating JPEG XL thumbnails of RAW photos no longer fails

[Full release notes](https://github.com/9001/copyparty/releases/tag/v1.20.28)`,
    es_ES: `Se actualizó copyparty a 1.20.28.

**Seguridad**

- Las claves de directorio (la opción de volumen \`dk\`) ya no permiten descargar desde subcarpetas ni otros accesos no previstos
- Los usuarios con acceso de lectura por SFTP ya no pueden truncar archivos
- Se corrigieron un problema de falsificación de solicitudes entre sitios y uno de scripting entre sitios

Las correcciones de claves de directorio y SFTP se aplican si activó esas funciones en archivos de configuración personalizados. La corrección de scripting entre sitios importa al visualizar Markdown malicioso, incluidos archivos recibidos mediante enlaces compartidos que permiten subir archivos; StartOS no activa la opción protectora \`nohtml\`. El aviso de falsificación de solicitudes entre sitios trata de la incrustación de páginas, especialmente con ajustes de cookies menos estrictos.

**Correcciones**

- El inicio de sesión ya no falla detrás de algunos proxies inversos
- La generación de miniaturas JPEG XL de fotos RAW ya no falla

[Notas completas](https://github.com/9001/copyparty/releases/tag/v1.20.28)`,
    de_DE: `copyparty auf 1.20.28 aktualisiert.

**Sicherheit**

- Verzeichnisschlüssel (das Volume-Flag \`dk\`) erlauben keine Downloads aus Unterordnern oder andere unbeabsichtigte Zugriffe mehr
- Benutzer mit Lesezugriff über SFTP können keine Dateien mehr kürzen
- Eine Cross-Site-Request-Forgery- und eine Cross-Site-Scripting-Lücke wurden behoben

Die Korrekturen für Verzeichnisschlüssel und SFTP gelten, wenn diese Funktionen in eigenen Konfigurationsdateien aktiviert wurden. Die XSS-Korrektur ist beim Anzeigen bösartiger Markdown-Dateien relevant, auch bei Dateien aus Freigabelinks mit Upload-Erlaubnis; StartOS aktiviert das schützende Flag \`nohtml\` nicht. Der CSRF-Hinweis betrifft das Einbetten von Seiten, insbesondere bei gelockerten Cookie-Einstellungen.

**Fehlerbehebungen**

- Die Anmeldung schlägt hinter manchen Reverse-Proxys nicht mehr fehl
- Das Erzeugen von JPEG-XL-Vorschaubildern aus RAW-Fotos schlägt nicht mehr fehl

[Vollständige Versionshinweise](https://github.com/9001/copyparty/releases/tag/v1.20.28)`,
    pl_PL: `Zaktualizowano copyparty do 1.20.28.

**Bezpieczeństwo**

- Klucze katalogów (flaga woluminu \`dk\`) nie pozwalają już na pobieranie z podfolderów ani inny niezamierzony dostęp
- Użytkownicy z dostępem do odczytu przez SFTP nie mogą już obcinać plików
- Naprawiono podatność typu cross-site request forgery oraz cross-site scripting

Poprawki kluczy katalogów i SFTP dotyczą instalacji z tymi funkcjami włączonymi we własnych plikach konfiguracyjnych. Poprawka XSS ma znaczenie podczas wyświetlania złośliwych plików Markdown, także otrzymanych przez łącza udostępniania umożliwiające przesyłanie plików; StartOS nie włącza flagi ochronnej \`nohtml\`. Ostrzeżenie o CSRF dotyczy osadzania stron, zwłaszcza przy mniej restrykcyjnych ustawieniach plików cookie.

**Poprawki**

- Logowanie nie kończy się już niepowodzeniem za niektórymi odwrotnymi proxy
- Generowanie miniatur JPEG XL ze zdjęć RAW nie kończy się już błędem

[Pełne informacje o wydaniu](https://github.com/9001/copyparty/releases/tag/v1.20.28)`,
    fr_FR: `copyparty mis à jour vers 1.20.28.

**Sécurité**

- Les clés de répertoire (l'option de volume \`dk\`) ne permettent plus de télécharger depuis les sous-dossiers ni d'autres accès non prévus
- Les utilisateurs ayant un accès en lecture via SFTP ne peuvent plus tronquer de fichiers
- Correction d'une faille de falsification de requête intersite et d'une faille de script intersite

Les correctifs des clés de répertoire et de SFTP s'appliquent si ces fonctions sont activées dans des fichiers de configuration personnalisés. Le correctif XSS importe lors de l'affichage de fichiers Markdown malveillants, y compris ceux reçus via des liens de partage autorisant l'envoi de fichiers ; StartOS n'active pas l'option protectrice \`nohtml\`. L'avis CSRF concerne l'intégration de pages, notamment avec des paramètres de cookies moins stricts.

**Corrections**

- La connexion n'échoue plus derrière certains proxys inverses
- La génération de miniatures JPEG XL de photos RAW n'échoue plus

[Notes de version complètes](https://github.com/9001/copyparty/releases/tag/v1.20.28)`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
