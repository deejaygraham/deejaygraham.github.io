# Replacement for array_to_sentence_string uses all commas rather than
# appending "and" as final connector

module Jekyll
  module TagFilters
    def array_to_comma_string(array)
      case array.length
        when 0
          ""
        when 1
          array[0].to_s
        else
          "#{array.join(', ')}"
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::TagFilters)
