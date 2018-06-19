# Jekyll plugin from https://github.com/michaelx/jekyll_file_exists
# Example {% file_exists images/file-example.jpg %}
#{% capture author_photo %}{% file_exists {{ author_photo_url }} %}{% endcapture %}
# {% if author_photo == "true" %}
#  {% assign author_photo = author_photo_url | prepend: "/" | prepend: site.baseurl %}
#{% else %}
#  {% assign author_photo = "no-photo.jpg" | prepend: "/images/routines/" | prepend: site.baseurl %}
#{% endif %}
module Jekyll
    class FileExistsTag < Liquid::Tag

        def initialize(tag_name, path, tokens)
            super
            @path = path
        end

        def render(context)
            # Pipe parameter through Liquid to make additional replacements possible
            url = Liquid::Template.parse(@path).render context

            # Adds the site source, so that it also works with a custom one
            site_source = context.registers[:site].config['source']
            file_path = site_source + '/' + url

            # Check if file exists (returns true or false)
            "#{File.exist?(file_path.strip!)}"
        end
    end
end

Liquid::Template.register_tag('file_exists', Jekyll::FileExistsTag)